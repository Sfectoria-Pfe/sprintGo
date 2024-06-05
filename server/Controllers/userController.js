const bcrypt = require("bcryptjs");
const userService = require("../Services/userService");
const auth = require("../Middlewares/auth");

const register = async (req, res) => {
  const { name, surname, email, password } = req.body;
  if (!(name && surname && email && password))
    return res
      .status(400)
      .send({ errMessage: "Please fill all required areas!" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  await userService.register(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res
      .status(400)
      .send({ errMessage: "Please fill all required areas!" });

  await userService.login(email, (err, result) => {
    if (err) return res.status(400).send(err);

    const hashedPassword = result.password;
    if (!bcrypt.compareSync(password, hashedPassword))
      return res
        .status(400)
        .send({ errMessage: "Your email/password is wrong!" });

    result.token = auth.generateToken(result._id.toString(), result.email);
    result.password = undefined;
    result.__v = undefined;

    return res
      .status(200)
      .send({ message: "User login successful!", user: result });
  });
};

const getUser = async (req, res) => {
  const userId = req.user.id;
  await userService.getUser(userId, (err, result) => {
    if (err) return res.status(404).send(err);

    result.password = undefined;
    result.__v = undefined;

    return res.status(200).send(result);
  });
};

const getUserById = async (req, res) => {
  const {id}= req.params
  console.log(id)
  try {
     const user = await userModel.findById(id);
  res.send(user)
  } catch (err) {
    res.send(err)
  }
};


const getUserWithMail = async (req, res) => {
  const { email } = req.body;
  await userService.getUserWithMail(email, (err, result) => {
    if (err) return res.status(404).send(err);

    const dataTransferObject = {
      name: result.name,
      surname: result.surname,
      color: result.color,
      email: result.email,
    };
    return res.status(200).send(dataTransferObject);
  });
};

const addUser = async (req, res) => {
  
    
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
    
  await userService.addUser({...req.body,password:hashedPassword}, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters
  await userService.deleteUser(userId, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.status(200).send(result);
  });
};
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  
  // Check if the request includes a new password
  if (newData.password) {
    try {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(newData.password, 10);
      newData.password = hashedPassword;
    } catch (error) {
      return res.status(500).send("Error hashing password");
    }
  }
  
  await userService.updateUser(userId, newData, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

  
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal server error' });
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
  getUserById,
};
