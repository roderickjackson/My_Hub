const Validator = require('fastest-validator')

let v = new Validator()

/**
 * Validating the following:
 * * Email
 * * Password
 * * First Name
 * * Last Name
 */
 exports.validateUserInput = (data) => {
    validataionSchema = {
        email: {type: "email"},
        password: {type: "string", min: 4},
        firstName: {type: "string", min: 2},
        lastName: {type: "string", min: 2}
     }

    check = v.compile(validataionSchema)

    const {email, password, firstName, lastName} = data.params

    return check({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
 }
 
/**
 * Validate if there is a user with this email
 */
exports.validateUser = (user) => {
    let ctx = {
        obj: user,
        message: 'A user with this email could not be found',
        code: 422
    }
    validate(ctx)
}

/**
 * Validate if password is correct
 */
exports.validatePassword = (password) => {
    let ctx = {
        obj: password,
        message: 'Wrong password',
        code: 401
    }
    validate(ctx)
}

/**
 * Private functions
 */
function validate(ctx){
    const {obj, message, code} = ctx
    if(!obj){
        const error = new Error(message)
        error.statusCode = code
    
        throw error
    }
    else{
        return obj
    }
}