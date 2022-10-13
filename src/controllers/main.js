const { logger } = require('../utils/logger')
module.exports  = {
    main: async function(ctx,next) {
        // ctx.throw(404,{
        //     code: -1,
        //     message: "你没有登录"
        // })
        logger.info('我是首页');
        ctx.body = 'api'
    }
}