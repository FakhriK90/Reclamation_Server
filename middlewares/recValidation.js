const {check, validationResult} = require('express-validator');

exports.recValidator =()=>[
    check('fullNameUser', 'fullNameUser is required').not().isEmpty(),
    check('departement', 'departement is required').not().isEmpty(),
    check('salle', 'salle is required').not().isEmpty(),
    check('nbPoste', 'nbPoste is required').not().isEmpty(),
    check('panne', 'panne is required').not().isEmpty(),
]

exports.validator=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {return res.status(400).send({errors:errors.array()})}
    next()
}