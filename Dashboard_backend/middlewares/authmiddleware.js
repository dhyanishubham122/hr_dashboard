// const jwt =require('jsonwebtoken');

// const authMiddleware=(req,res,next)=>{
//     const token=req.header('Authorization')?.split(' ')[1];
//        if(!token){
//         return res.status(401).send({message:'Access denied. No token provided.'});
//        }
//        try {
//          const decoded= jwt.verify(token,process.env.JWT_SECRET);
//          req.user=decoded;
//          if (requiredRole && decoded.role !== requiredRole) {
//           return res.status(403).json({ message: "Access denied. Insufficient permissions." });
//       }
//          next();
//        } catch (error) {
//           console.log("Unauthorized - Token expired or invalid in authmiddleware");
//         return res.status(401).json({ message: "Unauthorized - Token expired or invalid" });
//        }
// }

// module.exports=authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Role-based access control
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Access denied. Insufficient permissions." });
            }

            next();
        } catch (error) {
            console.log("Unauthorized - Token expired or invalid in authMiddleware");
            return res.status(401).json({ message: "Unauthorized - Token expired or invalid" });
        }
    };
};

module.exports = authMiddleware;
