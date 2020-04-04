const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } = require("util")

module.exports = async (request, response, next) => {
    const authHeader = request.headers.authorization

    if(!authHeader) 
        return response.status(401).send({error: 'No token provided'})

    const parts = authHeader.split(' ');

    if (!(parts.length === 2))
        return response.status(401).send({ error: 'Token error.' });

    const [scheme, token]= parts
    
    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({error: 'Token malformatted'})       

        
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        
        request.userId = decoded.id;
        
        return next();
    } catch (err) {
        console.log(err)
        return response.status(401).send({ error: "Token invalid" });
    }
}