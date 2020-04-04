const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
module.exports = function genereteUniqueId(id){
    return jwt.sign({ id }, authConfig.secret, {
        expiresIn: 86400,
    })
}