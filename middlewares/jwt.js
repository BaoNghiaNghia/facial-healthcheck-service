const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret,
	// audience: process.env.FACIAL_SERVER_AI,
	// issuer: process.env.FACIAL_SERVER_AI,
	// algorithms: ["HS256"],
});

module.exports = authenticate;