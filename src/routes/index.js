const koaBody = require('koa-body')
const auth = require('../middlewares/auth')
const configs = require('../configs')
const mainController = require('../controllers/main')
const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const { user } = require('../configs')
  
const routes = [
    {
        method:'get',
        url:'/',
        middleWares: [
            mainController.main
        ]
    },
    {
        method: 'post',
        url:'/auth/register',
        middleWares:[
            koaBody(),
            authController.register
        ]
    },
    {
        method: 'post',
        url:'/auth/login',
        middleWares:[
            koaBody(),
            authController.login
        ]
    },
    {
        method:'get',
        url:'/user/profile',
        middleWares: [
            userController.getProfile
        ]
    },
    {
        method: 'patch',
        url: '/user/avatar',
        middleWares:[
            auth(),
            koaBody({
                multipart:true,
                formidable:{
                    uploadDir:configs.upload.dir,
                    keepExtensions:true
                }
            }),
            userController.patchAvatar
        ]
    },
    {
        method: 'get',
        url: '/user/articles',
        middleWares:[
            userController.getArticles
        ]
    }
]

module.exports = {
    routes
}