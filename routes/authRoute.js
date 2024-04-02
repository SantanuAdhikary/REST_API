const {Router} = require("express");
const { registerController, LoginController } = require("../controller/authController");

const router = Router();


router.post('/register',registerController)
router.post('/login',LoginController)

module.exports = router;