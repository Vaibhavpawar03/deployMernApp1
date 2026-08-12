
const express = require("express");
const router = express.Router();

const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const { signup, login } = require("../Controllers/AuthController");



router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;



















// const express = require("express");
// const router = express.Router();
// const { signupValidation } = require("../Middlewares/AuthValidation");
// const { signup } = require("../Controllers/AuthController");
// router.post("/login", (req, res) => {
//     res.send("Login Successful");
// });
// router.post("/signup", signupValidation, signup);
// module.exports = router;