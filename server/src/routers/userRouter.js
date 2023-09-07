const express = require("express");
const { getusers, getuser } = require("../controllers/userController");
const userRouter = express.Router();

//GET: api/users
userRouter.get("/", getusers);
userRouter.get("/:id", getuser);

// userRouter.get("/profile", (req, res) => {
//     res.status(200).send({
//         message: 'users profile were returned',
//     })
// });

module.exports = userRouter;