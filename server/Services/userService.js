const userModel = require("../Models/userModel");
const { createRandomHexColor } = require("./helperMethods");

const register = async (user, callback) => {
  const newUser = userModel({ ...user, color: createRandomHexColor() });
  await newUser
    .save()
    .then((result) => {
      return callback(false, { message: "User created successfully!" });
    })
    .catch((err) => {
      return callback({ errMessage: "Email already in use!", details: err });
    });
};

const login = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user) return callback({ errMessage: "Your email/password is wrong!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: "Something went wrong",
      details: err.message,
    });
  }
};

const getUser = async (id, callback) => {
  try {
    let user = await userModel.findById(id);
    if (!user) return callback({ errMessage: "User not found!" });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: "Something went wrong",
      details: err.message,
    });
  }
};

const getUserWithMail = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return callback({
        errMessage: "There is no registered user with this e-mail.",
      });
    return callback(false, { ...user.toJSON() });
  } catch (error) {
    return callback({
      errMessage: "Something went wrong",
      details: error.message,
    });
  }
};

const addUser = async (user, callback) => {
  try {
    const newUser = userModel({ ...user, color: createRandomHexColor() });
    await newUser.save();
    return callback(false, { message: "User added successfully!" });
  } catch (err) {
    return callback({ errMessage: "Error adding user!", details: err });
  }
};

const deleteUser = async (id, callback) => {
  try {
    const result = await userModel.findByIdAndDelete(id);
    if (!result) return callback({ errMessage: "User not found!" });
    return callback(false, { message: "User deleted successfully!" });
  } catch (err) {
    return callback({ errMessage: "Error deleting user!", details: err });
  }
};
const updateUser = async (id, newData, callback) => {
  try {
    const result = await userModel.findByIdAndUpdate(id, newData, { new: true });
    if (!result) return callback({ errMessage: "User not found!" });
    return callback(false, { message: "User updated successfully!", updatedUser: result });
  } catch (err) {
    return callback({ errMessage: "Error updating user!", details: err });
  }
};


const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    // Map over the users array to include IDs in each user object
    const usersWithIds = users.map(user => ({ id: user._id, ...user.toObject() }));
    return usersWithIds;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Internal server error');
  }
};
module.exports = {
  register,
  login,
  getUser,
  getUserWithMail,
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
};
