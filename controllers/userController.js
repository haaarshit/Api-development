const Joi = require('joi')
const User = require('../model')
const bcrypt = require('bcrypt')
const jwtservice = require('../services/JwtService')
let access_token;
const CustomErrorHandler = require('../services/CustomErrorHandler');

const userController = {
    async me(req, res, next) {
        try{
          const user = await User.findOne({_id:req.user._id}).select(['name','email','-_id'])
          if(!user){
            return next(CustomErrorHandler.notFound())
          }
         
          res.json(user)
        }
        catch(err){
            return next(err)

        }
    }
}
module.exports = userController