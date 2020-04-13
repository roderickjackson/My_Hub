const {EMAIL_FROM, CLIENT_URL} = require('../../constants')

exports.welcomeEmailTpl = (data) => ({
	from: EMAIL_FROM,
	to: data.email,
	subject: `Welcome`,
	html: `
		<h2> Welcome, please use the following link to activate your account</h2>
		<p>${CLIENT_URL}/auth/activate/${data.Token}</p>
		</hr>
		<p>This email may contain sensetive information</p>
		<p>${CLIENT_URL}</p>
	`
})