const JWT = require('jsonwebtoken')

// secret for access token
const secret = 'xx11uyytlk'
// secret for refresh token
const secret1 = process.env.JWT_SECRET

class jwtservice{
   //  sign access token
    static sign(payload,expiry = '600s'){
       return JWT.sign(payload,secret,{expiresIn:expiry})
    }
    //  sign  refresh token
    static signRefresh(payload,expiry='1y' ){
       return JWT.sign(payload,secret1,{expiresIn:expiry})
    }
    //  verify access token
    static verify(token){
       return JWT.verify(token,secret)
    }

   //  verify refresh token
    static verifyRefresh(token){
       return JWT.verify(token,secret1)
    }

}

module.exports = jwtservice