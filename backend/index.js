const express = require("express");
const bodyparser = require("body-parser");
const login = require("./routes/loginRoutes");
const signup = require("./routes/signupRoutes");
const enroll = require("./routes/enrollRoutes");
const user = require("./routes/userRoutes");
var cors = require('cors');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyparser.json());
app.use(cors());
app.use('/login', login);
app.use('/signup', signup);
app.use('/enroll', enroll);
app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Express Server is running on port: ${PORT}`);
});