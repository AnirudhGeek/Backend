const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // console.log('auth middleware is called')
  const authHeaders = req.headers["authorization"];
//   console.log(authHeaders);

  const token = authHeaders && authHeaders.split(" ")[1];
  if(!token){
    res.status(401).json({
        success : false,
        message : "Access denied. No token provided.Please login to continue"
    })
  }
  //decoding the token
  try{
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decodedToken)

    req.userInfo = decodedToken  //we are using this userInfo because in bigger projects we need to pass this information to our frontend 
    next();
  }catch(e){
    res.status(500).json({
        success : false,
        message : "Access denied. No token provided.Please login to continue"
    })
  }
};
module.exports = authMiddleware;
