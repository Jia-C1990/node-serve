const supertest = require('supertest')
const { baseUrl } = require('./base')

const request = supertest(baseUrl)

describe('main', async function(){
    //测试用例
    it('GET / 200', async function() {
        await request.get('/').expect(200);
    });

});
