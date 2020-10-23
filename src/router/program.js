const express = require('express');
const Program = require('../model/Programs');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/program/create', auth, async (req,res) => {
    try{
        const subject = new Program({
            ...req.body,
            owner: req.user.id
        });
        await subject.save();
        res.status(201).send(subject);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/program/readAllProgram", auth, async (req, res) => {
    try {
        const subject = await Program.find({});
        if (!subject) {
            return res.status(404).send();
        }
        res.status(200).send(subject);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;

