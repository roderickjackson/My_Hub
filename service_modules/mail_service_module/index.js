const {SENDGRID_API_KEY} = require('../constants')
const {accountActivationTmpl} = require('./templates/accountActivation')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

exports.sendMail = async (mailType, token, email) => {
    const activateAccount = accountActivationTmpl(token, email)

    try{
        await sgMail.send(activateAccount)
        console.log('email sent', mailType)
        return {
            message:`Email has been sent to ${email}. Please follow the instructions to active your account.`
        }
    }
    catch(error){
        throw new Error(error)
    }
}