const express = require("express");
const userController = require("../Controllers/userController");
const { verifyAdminToken } = require("../Middlewares/adminauth");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get-user", userController.getUser);
router.get("/get-user/:id", userController.getUserById);
router.get("/all-users",userController.getAllUsers);
router.post("/get-user-with-email", userController.getUserWithMail);
router.post("/add-user",verifyAdminToken,userController.addUser);
router.put("/update-admin/:id",verifyAdminToken,userController.updateUser);
router.delete("/delete-user/:id", verifyAdminToken, userController.deleteUser);
router.put("/update-user/:id",userController.updateUser);



module.exports = router;
