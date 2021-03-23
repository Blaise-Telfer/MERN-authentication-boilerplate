const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const config = require("./config/config");
require("dotenv").config();

//database configuration
mongoose.connect(config.MONGO_URI, {
	useNewUrlParser: true, useUnifiedTopology: true,
	useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


//cors & bodyparser middleware
const allowCrossDomain = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize())


//routes
const auth = require("./routes/authRoute");
app.use("/api/auth", auth);
const verify = require("./routes/verificationRoute");
app.use("/api/verify", verify);
const reset = require("./routes/resetRoute");
app.use("/api/reset", reset);

//port configuration
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	
	// Set static folder
	app.use(express.static("client/build"));
	
	// index.html for all page routes    html or routing and naviagtion
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
