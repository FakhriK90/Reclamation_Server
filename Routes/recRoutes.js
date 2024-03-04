const express = require('express');
const router = express.Router();
const Rec = require('../Models/reclamation');
const { recValidator, validator } = require('../middlewares/recValidation');


// @route   POST /addReclamation
router.post("/addReclamation",recValidator(),validator, async(req,res) => {
    try {
        const newRec = new Rec ({
            fullNameUser: req.body.fullNameUser,
            departement: req.body.departement,
            salle: req.body.salle,
            nbPoste: req.body.nbPoste,
            panne: req.body.panne,
            description: req.body.description
        });
        console.log(newRec);
        await newRec.save();
        res.send({msg:'Reclamation successfully added', Rec: newRec});
    } catch (error) {
        res.status(400).send({msg:'No reclamation added'})
    }
});

// @route   GET /allReclamation
router.get("/allReclamation", async(req,res) => {
    try {
        const allRec = await Rec.find();
        res.send({msg:'All reclamation', Rec: allRec});
    } catch (error) {
        res.status(400).send({msg:'No reclamation found'})
    }
});

module.exports = router;