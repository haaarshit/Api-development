
const Joi = require('joi')
const User = require('../model')
const RefreshToken = require('../model/refreshToken')
const bcrypt = require('bcrypt')

const jwtservice = require('../services/JwtService')
const CustomErrorHandler = require('../services/CustomErrorHandler')

const refreshController = {
    async refresh(req, res, next) {
        // validate request
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { error } = refreshSchema.validate(req.body)
        if (error) {
            return next(error)
        }


        let refresh_token;
        let user_id; //id that will we extract from refresh token
        try {
            // check wheather the token in db or not
            refresh_token = await RefreshToken.findOne({ token: req.body.refresh_token })
            //    if token doesnot exist
            if (!refresh_token) {
                return next(CustomErrorHandler.unautherized('Invalid refresh token'))
            }

            //    else verify the refresh  token
            
            try {
                const { _id } = jwtservice.verifyRefresh(refresh_token.token)
                user_id = _id
            }
            catch (error) {
                next(error)
            }


            // find user in user database
            const user = await User.findOne({_id:user_id})

            if(!user){
                return next(CustomErrorHandler.unautherized('No user found'))
            }


            // create a nwe access token
            access_token =jwtservice.sign({_id:user._id,role:user.role})
            // refresh_token =jwtservice.signRefresh({_id:user._id,role:user.role},'1y')
            

            // create a refresh token in database


            // await RefreshToken.create({token:refresh_token})
            res.json({access_token})

        }
        catch (error) {
            return next(new Error('something went wrong' + error.message))
        }
      
    }
}
module.exports = refreshController