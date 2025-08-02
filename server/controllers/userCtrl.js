const userSchema = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



    //Register user
    exports.registerUser =  async(req, res) =>{
        const {name, email, password } = req.body;
        try {
            const user = await userSchema.findOne({email});
        if(user) return res.status(400).json({msg: 'user already exists!'});
      
        //create big password and then update the schema
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            name: name,
            email: email,
            password: passwordHash
        })
        await newUser.save();
        res.json({msg: 'Register success!'})
        } catch (err) {
            res.status(500).json({msg:err.messge})
        }

    },

    //Login user
    exports.loginUser =  async(req, res) => {
        console.log("req.body::", req.body); 
        const { email, password } = req.body;
        try {
           const user = await userSchema.findOne({email});
           console.log("user:::", user)
           if(!user) {
            return res.status(400).json({msg: 'User does not exist!'});
           }

           const isMatch = await bcrypt.compare(password, user.password);
           if(!isMatch) {
            return res.status(400).json({msg: 'Incorrect password!'});
           }

           //if login successful
           const payload = {
            id: user._id,
            name: user.name
           }

           const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d"});
           res.json({token});

        } catch (err) {
            console.log("error:::", err);
            res.status(500).json({msg: err.messge});
        }
    },

    //Verify user
    exports.verifytoken = async(req, res) => {
        try {
            const token = req.header("Authorization");
            if(!token) return res.send(false);
            jwt.verify(token, process.env.TOKEN_SECRET, async(err, verifiedUser) => {
                if(err) return res.send(false);

                const user = await userSchema.findById(verifiedUser.id);
                if(!user) return res.send(false);

                return res.send(true);

            })
        } catch (err) {
            res.status(500).json({msg: err.messge});
        }
    }

