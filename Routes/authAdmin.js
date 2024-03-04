const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuth = require('../middlewares/password');
const {userValidator,validator} = require('../middlewares/UserValidator');

// @route   POST /register
router.post('/register', userValidator(),validator,async (req, res) => {
    const { fullNameAdmin, email, password } = req.body;
    try {
        const userFound = await User.findOne({email, fullNameAdmin})
        if (userFound) {
            return res.status(400).send({msg:'User already exists'})
        }
        const newUser = new User(req.body);
        const hashedPassword = await bcrypt.hash(password, 6);
        newUser.password = hashedPassword;
        await newUser.save();

        res.send({msg:'User successfully added',user: newUser});
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'No user added'})
    }
});

// @route   POST /signin

router.post('/signin', async (req,res) => {
    const {email, password}= req.body;
    try {
        const existUser = await User.findOne({email});
        if (!existUser) {
            return res.status(400).send({msg:"bad credential"})
        }
        const matched = await bcrypt.compare(password, existUser.password)
        if (!matched) {
            return res.status(400).send({msg: 'bad credential'})
        }
        const payload = {
            _id: existUser._id
        }
        const token = await jwt.sign(payload, process.env.secretKey);
        const loginUser = await User.findOne({email}).select('-password');
        res.send({
            user: loginUser,
            token: `Bearer ${token}`,
            msg: 'Successfully connected'
        })
    } catch (error) {
        res.status(400).send({msg: 'not connected'})
    }
});

//Current

router.get('/currentUser', isAuth(), (req,res) =>{
    res.send({user: req.user})
})


module.exports = router;