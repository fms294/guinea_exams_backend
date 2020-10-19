const express = require('express');
const Subject = require('../model/Subjects');
const auth = require('../middleware/auth');
const User = require('../model/Users');
const router = new express.Router();

router.post('/subject/create', auth, async (req,res) => {
    try{
        const subject = new Subject({
            ...req.body,
            owner: req.user.id
        });
        await subject.save();
        res.status(201).send(subject);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/subject/readAllSubject", auth, async (req, res) => {
    try {
        const subject = await Subject.find({});
        if (!subject) {
            return res.status(404).send();
        }
        res.status(200).send(subject);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;

