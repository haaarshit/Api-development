class CustomErrorHandler extends Error{
    constructor(status,message){
        super()
       this.status = status;
       this.message = message;
    }
    static allreadyExist(message){
        // returning the object of this class
        return new CustomErrorHandler(409,message);
    }
    static invalidCredentilas(message){
        // returning the object of this class
        return new CustomErrorHandler(401,message);
    }

    // if user is  unautherized
    static unautherized(message){
        // returning the object of this class
        return new CustomErrorHandler(401,message);
    }
    static notFound(message='not found'){
        // returning the object of this class
        return new CustomErrorHandler(404,message);
    }
    static serverError(message='Internal server error'){
        // returning the object of this class
        return new CustomErrorHandler(500,message);
    }
}

module.exports =  CustomErrorHandler