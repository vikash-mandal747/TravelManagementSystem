var jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        //check the token validity and attach userId and role to the req object
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(403).json({ message: "Token Not Found, Please Login..." })
        } else {
            //token found, verify the token
            var decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
            if (decoded) {
                //attach userId and role to req object
                req.userId = decoded.userId;
                req.role = decoded.role;
                next()
            }
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }

}

module.exports = authMiddleware