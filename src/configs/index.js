const path = require('path')

module.exports = {
    app:{
       port: 22022, 
    },
    router:{
        prefix: '/api'
    },
    user:{
        passwordSalt: 'kkb'
    },
    auth:{
        secretKey: 'cnode'
    },
    staticAssets:{
        prefix: '/public',
        dir: path.resolve(__dirname, '../../public')
    },
    upload:{
        dir: path.resolve(__dirname, '../../public/avatar')
    },
    database: {
        host:'127.0.0.1',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'sys'
    }
}