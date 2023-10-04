const Joi = require('joi')
const Product = require('../model/product')
const bcrypt = require('bcrypt')
const jwtservice = require('../services/JwtService')
let access_token;
const CustomErrorHandler = require('../services/CustomErrorHandler');
const multer = require('multer')
const path = require('path')
 

// const pathurl = path.join(__dirname+'uploads/')
const storage = multer.memoryStorage({

    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.random()*1E9}${path.extname(file.originalname)}`//ex :- 68896916894-921896199399.extName
       cb('null',uniqueName)   
    }
})


//definig the field and size limit of the file to be inputed
const handleMultiPartData = multer({storage,limits:{fileSize:1000000*5}}).single('image')//5MB


const productController = {
    async store(req, res, next) {
        //  multipart form data --> for this we have to install multer library
        handleMultiPartData(req,res,(err)=>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message))
            }
            const productschema = Joi.object({
                name:Joi.string().required(),
                price:Joi.number().required(),
                size:Joi.string().required()
            })

            const {error} = productschema.validate(req.body)
            if(error){

            }
            
            console.log(req.file)
            res.json('hh')
        })
        
    }
}
module.exports = productController