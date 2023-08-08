const getToken = (req) => {
  
    try {
        const authHeader = req.headers.authorization
        
        const token = authHeader.split(" ")[1];
    
        console.log(token)
        return token;
        
    } catch (error) {
        console.log(error.message)
    }
  
};

module.exports = getToken;
