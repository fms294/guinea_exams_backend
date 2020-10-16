const express = require("express");
const User = require("../model/Users");
const router = new express.Router();
const auth = require("../middleware/auth");

//testing api
// router.get('/users', (req, res) => {
//     res.status(201).send('Huh');
// });

//Post request for Signup
router.post("/users/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

// router.post('/users/signup',async (req,res) => {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send(user);
// });

//Post request for Login
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.username,
            req.body.password
        );
        //auth token
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ e: e.message });
    }
});

//Post request for Logout
router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send("Logout Success");
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
