const Koa = require('koa')
// 静态代理
const koaStaticCache = require('koa-static-cache')
// 路由 
const KoaRouter = require('koa-router')
const configs = require('./configs')

const { routes }  = require('./routes')
const resHandler = require('./middlewares/res_handler')

const databaseConnection = require('./middlewares/database-connection')

const app = new Koa()

//静态文件代理
app.use(koaStaticCache({
    prefix: configs.staticAssets.prefix,
    dir: configs.staticAssets.dir,
    dynamic:true,
    gzip: true
}))

// 数据库链接
app.use(databaseConnection(configs.database))

//路由对象
const router = new KoaRouter({
    prefix: configs.router.prefix
})

//绑定
routes.map(route=>{
    router[route.method](route.url, resHandler(), ...route.middleWares);
})

app.use(router.routes())

app.listen(configs.app.port,()=>{
    console.log(`服务启动成功：http://localhost:${configs.app.port}`);
})