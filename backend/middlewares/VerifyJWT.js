const jwt = require('jsonwebtoken')
const getToken = require('../auth/get-token')


const verifyJWT = async (req, res, next) => {

    const token = getToken(req)

    if(!token){
      res.status(401).json({
        message: 'Token not provided'
      })
    }
    try {
        const decoded = await jwt.verify(token, "testsecret");
  
        next();
      } catch (err) {
        res.status(500).json({ message: err.message});
      }
}


module.exports = verifyJWT