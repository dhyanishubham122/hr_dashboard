const express = require("express");
const { signup, login } = require("../controllers/authController");
const {userProfile,profileUpdate}=require("../controllers/userController")
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", userProfile);
router.patch("/profile", profileUpdate);

module.exports = router;
