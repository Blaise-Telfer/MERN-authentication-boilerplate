const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/config");
const User = require("../models/userModel");
const moment = require("moment");
moment().format();


//verify from the email
router.post("/", (req, res) => {
	const { email, token } = req.body;
	User.findOne({ email }).then(user => {
		
		if (!user) {
		  return res.status(400).json({ message: "Email not found" });
		}
		if(token !== user.verifyToken.token){
		  return res.status(400).json({ message: "Incorrect token" });
		}
		if(user.verified){
		  return res.status(400).json({ message: "You have already used this link. Try logging in." });
		}
		if(moment().utcOffset(0) > user.verifyToken.expires){
		  return res.status(400).json({ message: "Your link has expired. Try logging in." });
		}
		
		const payload = {
		  id: user.id,
		  username: user.username,
		  email: user.email,
		  role: user.role
		};
		
		// Sign token, expires in 3hrs
        jwt.sign(payload, keys.JWT_SECRET, { expiresIn: 10800 }, (err, token) => {
		  res.json({success: true, token: "Bearer " + token});
		});
		
		User.findOneAndUpdate({ email },
		  {$set: {
			verifyToken: { token: token, expires: null },
			verified: true
		  }}
		).catch((error) => {res.json(error)});
		return res.status(200).json({ message: "Your account has been verified." });
	});
});


module.exports = router;