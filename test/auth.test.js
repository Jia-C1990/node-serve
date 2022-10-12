const supertest = require('supertest')
const { baseUrl } = require('./base')

const request = supertest(baseUrl+ '/auth')

describe('auth', async function(){
    this.timeout(0) //  解除超时设置
    describe('register', async function(){
        const url = '/register'
        const username = `test_${Date.now()}`
        const password = '123456'

        it('POST /auth/register 400', async function() {
            await request.post(url).expect(400,{
                code:1011,
                message:'注册用户名和密码不允许为空'
            });
        });

        it('POST /auth/register 400 1012', async function() {
            await request.post(url).send({
                username,
                password,
                repassword: password+'123'
            }).expect(400,{
                code:1012,
                message:'两次输入密码不一致'
            });
        });

        it('POST /auth/register 409 1013', async function() {
            await request.post(url).send({
                username:'test_1662305761982',
                password,
                repassword: password
            }).expect(409,{
                code:1012,
                message:'已注册'
            });
        })

        it('POST /auth/register 200', async function() {
            await request.post(url).send({
                username,
                password,
                repassword: password
            }).expect(200);
        })  
    })

    //login
    describe('login', async function(){
        const url = '/login'

        it('POST /auth/login 400 1021', async function() {
            await request.post(url).expect(400)
        })

        it('POST /auth/login 404 1022', async function() {
            await request.post(url).send({
                username:`test_${Date.now()}`,
                password: '123123'
            }).expect(404)
        })

        it('POST /auth/login 401 1023', async function() {
            await request.post(url).send({
                username:'test_1662305761982',
                password:'test_1662305761982'              
            }).expect(401)
        })

        it('POST /auth/login 200', async function() {
            await request.post(url).send({
                username:'test_1662305761982',
                password:'123456'                  
            }).expect(200).then(res=>{
                let authorization =  res.header.authorization;
                if(!authorization){
                    throw new Error('authorization not found')
                }
            })
        })
    })
});
