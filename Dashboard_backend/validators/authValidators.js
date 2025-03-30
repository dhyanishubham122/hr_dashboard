const bcrypt=require('bcrypt');
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

const validatePassword = async (inputPassword, storedHashedPassword) => {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
};
module.exports={isValidEmail,isValidPassword,validatePassword};