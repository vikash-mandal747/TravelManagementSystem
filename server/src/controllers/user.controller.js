const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const saltRounds = 10;

//signup
const userSignup = (req, res) => {

    try {
        //name,email,password,role from req.user
        //make sure role should not be admin
        //hash the password and store in a DB 
        const { name, email, password } = req.body;
        const myPlaintextPassword = password;
        bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                //hash generation failed
                res.status(500).json({ message: "Something went wrong" })
            } else {
                //hash is generated
                //store hahsed password in DB along with other information
                await userModel.create({ ...req.body, password: hash });

                res.status(201).json({ message: "User Signup Successfull" })
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

}


//login
const userLogin = async (req, res) => {

    try {
        //email,password from req.user
        //store password in a token
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            // user not found
            res.status(404).json({ message: "User Not Found!" });
        } else {
            //user Found
            let hash = user.password;
            bcrypt.compare(password, hash, function (err, result) {
                // result == true
                if (err) {
                    //hash comparison failed
                    res.status(404).json({ message: "Something went wrong!" });
                } else {
                    //comparison successful
                    //will get result --> true -> right password
                    //result --> false --> wrong password
                    if (result) {
                        const token = jwt.sign({ userId : user._id, role: user.role }, process.env.JWT_SECRETKEY);
                        res.status(200).json({ message: "Login Success!", token });
                    } else {
                        res.status(200).json({ message: "Wrong Password!" })
                    }
                }
            });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

}

module.exports = { userSignup, userLogin }
