const jwt = require('jsonwebtoken');
const JWT_secret = "MSS Online Learning Platform Users"  

const fetchuser = (req, res, next) => {

    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authentictate by providing the token" });
    }
    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authentictate by providing the valid token" });
    }

}

module.exports = fetchuser;