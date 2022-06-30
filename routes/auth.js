const express = require("express");
//const { route } = require("express/lib/application");
const authController = require("../controllers/authController")
const router = express.Router();

router.get("/login", authController.getLogin);

console.log('login finished');

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", authController.postSignUp);
router.post("/login",authController.postLogin)

router.get("/logout", authController.logout)

module.exports = router;

// GET is less secure than POST ,in GET parameters are sent as part of URL, in POST parameters
// the parameters are sent as a body of the request 