const configs = require('../configs')
const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')


module.exports = {

    async register(ctx,next){
        let {username,password,repassword} = ctx.request.body

        username = username && username.trim()
        password = password && password.trim()
        repassword = repassword && repassword.trim()

        if(!username||!password){
            ctx.throw(400,{
                code: 1011,
                message: '注册用户名和密码不允许为空'
            })
        }

        if(password !== repassword) {
            ctx.throw(400,{
                code: 1012,
                message: '两次输入密码不一致'
            })
        }

        const userService = ctx.state.services.user
        let user = await userService.getUserByUserName(username)

        if(user){
            ctx.throw(409,{
                code: 1012,
                message: '已注册'
            })
        }

        let newUser = await userService.addUser(username,password)

        ctx.body = {
            id:newUser.id,
            username,
            createdAt: newUser.createdAt
        }

    },

    async login(ctx, next) {
        let {username,password} = ctx.request.body
        username = username && username.trim()
        password = password && password.trim()
        if(!username||!password){
            ctx.throw(400,{
                code: 1021,
                message: '登录用户名和密码不允许为空'
            })
        }
        const userService = ctx.state.services.user
        let user  = await userService.getUserByUserName(username)

        if(!user){
            ctx.throw(404,{
                code: 1022,
                message: '用户不存在'
            })   
        }

        console.log(user);

        const hmac = crypto.createHmac('sha256',configs.user.passwordSalt)
        password = hmac.update(password).digest('hex')
        if(password !== user.password){
            ctx.throw(401,{
                code: 1023,
                message: '密码不对'
            })             
        }    

        let token = jsonwebtoken.sign({
            id:user.id,
            username:user.username
        }, configs.auth.secretKey)

        ctx.set('authorization',token)

        ctx.body = {
            id:user.id,
            username: user.username,
            avatar: user.avatar,
            createAt: user.createAt
        }
    }

}