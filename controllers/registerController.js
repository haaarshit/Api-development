const Joi = require('joi')
const User = require('../model')
const RefreshToken = require('../model/refreshToken')
const bcrypt = require('bcrypt')
const jwtservice = require('../services/JwtService')
let access_token;
let refresh_token;
const CustomErrorHandler = require('../services/CustomErrorHandler')

const registerController = {
    // Register
    async register(req, res, next) {
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password')
        })
        console.log(req.body)
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        // if there is no error now check if user already in DATABASE
        try {
            const exist = await User.exists({ email: req.body.email })
            //  if user exists
            if (exist) {
                return next(CustomErrorHandler.allreadyExist("User already exist with this email"));
            }
        }
        catch (err) {
            return next(err)
        }
        // Password HASHING
        const hashedPassowrd = await bcrypt.hash(req.body.password, 10);//taking password and  salting no
        // prepare the model
        const { name, email } = req.body    
        const user = new User({
            name,
            email,
            password:hashedPassowrd
        })

        try {
            const result =  await user.save();
            // user.save()
            
            // return JWT token giving id and role as payload
            access_token =jwtservice.sign({_id:result._id,role:result.role})

            // refresh token with another secret key
             console.log(result._id)
            refresh_token =jwtservice.signRefresh({_id:result._id,role:result.role},'1y')
            console.log(refresh_token)
            // create a refresh token in database
            RefreshToken.create({token:refresh_token})
        }
        catch (err) {
            return next(err)
        }

        res.json({access_token:access_token,refresh_token:refresh_token})

    }
}
module.exports = registerController