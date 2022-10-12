module.exports = () => {
    return async function(ctx,next) {
        // ctx.body = 'api'

        /**
         *  {code:0,message: '',results:数据}
         *  {code: 具体错误代码 ,message: '错误描述',errors:错误原因}
         * 
        */
        try {
            await next()
            ctx.body = {
                code: 0,
                message: '',
                results: ctx.body
            }
        } catch (error) {
            ctx.status = error.status || 500
            ctx.body = {
                code: error.code,
                message: error.message,
                errors: error.errors
            }
            ctx.app.emit('error',error,ctx)
        }
    }
}