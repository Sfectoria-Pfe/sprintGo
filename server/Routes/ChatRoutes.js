const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} = require("../Controllers/chatControllers");
const { verifyToken } = require("../Middlewares/auth");

const router = express.Router();

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, fetchChats);
router.route("/createGroup").post(verifyToken, createGroupChat);
router.route("/fetchGroups").get(verifyToken, fetchGroups);
router.route("/groupExit").put(verifyToken, groupExit);

module.exports = router;