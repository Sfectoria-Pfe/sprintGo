const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messageControllers");
const { verifyToken } = require("../Middlewares/auth");

const router = express.Router();

router.route("/:chatId").get(verifyToken, allMessages);
router.route("/").post(verifyToken, sendMessage);

module.exports = router;