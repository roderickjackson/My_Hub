const {EMAIL_FROM, CLIENT_URL} = require('../../constants')

exports.accountActivationTmpl = (token, email ) => ({
    from: EMAIL_FROM,
    to: email,
    subject: `Welcome`,
    html: `
        <h2> Welcome, please use the following link to activate your account</h2>
        <p>${CLIENT_URL}/auth/activate/${token}</p>
        </hr>
        <p>This email may contain sensetive information</p>
        <p>${CLIENT_URL}</p>
    `
})