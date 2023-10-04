const Joi = require('joi')
const User = require('../model')
const RefreshToken = require('../model/refreshToken')
const bcrypt = require('bcrypt')
const jwtservice = require('../services/JwtService')
let access_token;
let refresh_token;
const CustomErrorHandler = require('../services/CustomErrorHandler')

const loginController = {
    // login controller
    async login(req, res, next) {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })

        const { error } = loginSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return next(CustomErrorHandler.invalidCredentilas("Invalid credentials"))
            }

            //   if user exits 
            // Compaer the passwowd using bcrypt library
            const matchPassword = await bcrypt.compare(req.body.password, user.password)
            if (!matchPassword) {
                return next(CustomErrorHandler.invalidCredentilas("Invalid credentials"))
            }

            // // access token

            try {
                // return JWT token giving id and role as payload
                access_token =jwtservice.sign({_id:user._id,role:user.role})
    
                // refresh token with another secret key
    
                refresh_token =jwtservice.signRefresh({_id:user._id,role:user.role},'1y')
                console.log(refresh_token)
                // create a refresh token in database
                RefreshToken.create({token:refresh_token})
                
              
            }
            catch (err) {
                return next(err)
    
            }


            // response with access token
            res.json({ access_token ,refresh_token})
        }
        catch (error) {

        }
    },




    
    // logout controller
    async logout(req,res,next){
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { error } = refreshSchema.validate(req.body)
        if (error) {
            return next(error)
        }


        try{
            // delete the refresh token from database
            const data = await RefreshToken.deleteOne({token:req.body.refresh_token})
            
            res.json({
               "token-deleted":data
            })
        }
        catch(err){
            next(new Error('somethig went wrong in database'))
        }
    }
}
module.exports = loginController