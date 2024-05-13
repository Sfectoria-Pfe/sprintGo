const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const verifyAdminToken = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ errMessage: "Authorization token not found!" });

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    // Verify JWT token
    await jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      if (err)
        return res
          .status(401)
          .send({ errMessage: "Authorization token invalid", details: err });

      // Check if user is admin
      const user = await userModel.findById(verifiedToken.id);
      if (!user || user.role !== "admin")
        return res.status(403).send({ errMessage: "User does not have admin privileges!" });

      // If user is admin, proceed to next middleware
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      errMessage: "Internal server error occurred!",
      details: error.message,
    });
  }
};

module.exports = {
  verifyAdminToken,
};
