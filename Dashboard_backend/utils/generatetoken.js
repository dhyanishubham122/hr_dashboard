const jwt=require('jsonwebtoken');


const  generateToken =(user)=>{
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );
}
module.exports = generateToken;