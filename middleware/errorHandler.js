const validationError = require('joi').ValidationError
const CustomErrorHandler = require('../services/CustomErrorHandler')


const errorHandler = (err,req,res,next)=>{
    let statuscode = 500;
    let data = {
        message:'Internal server error',
        orginalError:err.message
    }

    // if validation error
    if(err instanceof validationError){
      statuscode = 422; //used for validation error
      data ={
        message :err.message
      }
    }
    // if error is of custom error handler 
    if(err instanceof CustomErrorHandler){
       statuscode = err.status
       data = {
        message:err.message
       }
    }
   return res.status(statuscode).json(data)
}
module.exports = errorHandler
