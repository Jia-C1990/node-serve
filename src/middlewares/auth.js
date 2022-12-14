const jsonwebtoken = require('jsonwebtoken');
const config = require('../configs');

module.exports = () => {
    return async function(){
        try {
            let user = jsonwebtoken.verify(ctx.headers.authorization, config.auth.secretKey);
            ctx.state.user = user;
        } catch (err){
            ctx.throw(401, {
                code: -1,
                message: '你没有登录'
            })
        }

        await next();
    }

}