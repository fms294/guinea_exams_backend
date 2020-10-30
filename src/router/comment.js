const express = require("express");
const Comment = require("../model/Comments");
const User = require("../model/Users");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/writeComment", auth, async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      owner: req.user.id
    });
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/readComment/:lesson_name", auth, async (req, res) => {
  try {
    // const lesson_name = req.params.lesson_name
    const comment = await Comment.find({
      lesson_name: req.params.lesson_name
    });

    let user = [];
    const finalUser = [];
    for (var x in comment) {
      let finalObj = {};
      // console.log("x", x)
      user = user.concat(await User.find({ _id: comment[x].owner }));
      // console.log("username",user[x].username );
      const name = user[x].username;
      finalObj = { name, ...comment[x] };
      finalUser.push(finalObj);
    }

    console.log(finalUser);

    if (!comment) {
      return res.status(404).send();
    }
    res.status(200).send(finalUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
