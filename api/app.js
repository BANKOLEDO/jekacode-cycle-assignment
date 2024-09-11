const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require('bcryptjs')
const { StatusCodes } = require("http-status-codes");


app.use(cors());
app.use(express.json());

app.post("/api/user-login", async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Enter All Necessary Data",
        });
    } else if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Enter Your Email",
        });
    } else if (!password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Enter Your Password",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    res.status(StatusCodes.CREATED).json({
        message: "User Has Logged In Successfully.",
    });
    const user = req.body;
    console.log(user);
    console.log(`The user with email: ${user.email} has logged in successfully`);
});

const PORT = 8000;
app.listen(PORT, async () => {
    try {
    console.log(`Server is running on port: ${PORT}`);
    } catch (error) {
    console.log(error);
    }
});