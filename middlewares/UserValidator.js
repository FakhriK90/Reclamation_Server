const {check, validationResult} = require('express-validator');

exports.userValidator =()=>[
    check('fullNameAdmin', 'fullNameAdmin is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
]

exports.validator=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {return res.status(400).send({errors:errors.array()})}
    next()
}