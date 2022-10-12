
module.exports  = {
    main: async function(ctx,next) {
        // ctx.throw(404,{
        //     code: -1,
        //     message: "你没有登录"
        // })
        ctx.body = 'api'
    }
}