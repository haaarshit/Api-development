const CustomErrorHandler = require('../services/CustomErrorHandler');
const jwtservice = require('../services/JwtService');


const auth = async(req,res,next)=>{
    let authHeader = req.headers.authorization

    if(!authHeader){
        return next(CustomErrorHandler.unautherized('user is not autherized'))
    }

    // split the header with ' ' to  get token
    const token = authHeader.split(' ')[1]


    // verify token
    try{
       const {_id,role} = await jwtservice.verify(token)
       const user = {
        _id,
        role
       }
       req.user = user;
       next()
    }
    catch(err){
      return next(new Error('Auth failed'))
    }
}
module.exports = auth