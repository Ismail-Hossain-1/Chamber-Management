const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyDoctor = (req, res, next) => {

    const token = req.header('Authorization');
   // console.log("Token ", token);
    if (!token) return res.status(401).send("Unauthorized")

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    
    if(decoded){
            req.user= decoded;
            
             next();
    }
    else console.log(decoded)
}

module.exports={verifyDoctor};