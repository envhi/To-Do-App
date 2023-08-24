const UserServices = require("../services/UserServices");
const ToDoServices = require("../services/ToDoServices")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserToken = require("../auth/create-user-token");
const getToken = require("../auth/get-token");
const UserService = require("../services/UserServices");

module.exports = class UserController {

  static async getUserInfo(req, res) {
    const token = await getToken(req)

    const user = await UserService.getUserByToken(token)

    res.status(200).json({user: user})
  }


  static async getAllUserToDos(req, res) {
    // get user token
    const token = await getToken(req);
    // send the token to get the user
    const user = await UserService.getUserByToken(token);

    try {
      const allUserToDos = await ToDoServices.getAllUserToDos(user);

      res.status(200).json({allUserToDos});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  static async getAllUserDoneToDos(req, res) {
    // get user token
    const token = await getToken(req);
    // send the token to get the user
    const user = await UserService.getUserByToken(token);

    try {
      const allUserToDos = await ToDoServices.getAllUserToDos(user);

      const allUserDoneToDos = allUserToDos.filter((todo) => todo.createdAt.toString() != todo.updatedAt.toString())

      res.status(200).json({allUserDoneToDos});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }


  static async addNewUser(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400).json({ message: "The name is mandatory" });
      return;
    }

    if (!email) {
      res.status(400).json({ message: "The e-mail is mandatory" });
      return;
    }

    if (!password) {
      res.status(400).json({ message: "The password is mandatory" });
      return;
    }

    // check if user exists by email
    const exists = await UserServices.checkIfEmailExists(email);

    if (exists) {
      res.status(422).json({
        message: "This e-mail has been already registered",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const newUser = await UserServices.addNewUser({
        name,
        email,
        password: passwordHash,
        image: "test",
      });

      const token = await createUserToken(newUser, req, res);

      res.status(200).json({
        message: "New user registered!",
        newUser,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async findUserById(req, res) {
    if (!req.params.id) {
      res.status(400).json({
        message: "User id is mandatory",
      });
      return;
    }

    const id = req.params.id;

    try {
      const user = await UserServices.findUserById(id);

      if (!user) {
        res.status(500).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User found!",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  static async logIn(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "The e-mail is mandatory" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "The password is mandatory" });
      return;
    }

    const user = await UserServices.checkIfEmailExists(email);

    if (!user) {
      res.status(422).json({
        message: "E-mail not found",
      });
      return;
    }

    const checkPassword = await UserServices.passwordCompare(
      password,
      user.password
    );

    if (!checkPassword) {
      res.status(422).json({
        message: "Incorrect password!",
      });
      return;
    }

    const token = await createUserToken(user, req, res);

    res.status(200).json({
      message: "Logged in!",
      token,
    });
  }

  static async editUserEmail(req, res) {
    const token = await getToken(req);

    const user = await UserServices.getUserByToken(token);

    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "E-mail is mandatory",
      });
      return;
    }

    if (user.email === email) {
      res.status(422).json({
        message: "The e-mail must be different from your current e-mail",
      });
      return;
    }

    const previousEmail = user.email;

    user.email = email;

    try {
      const updatedUser = await UserServices.updateUserEmail(user);

      res.status(200).json({
        message: `Your e-mail has been set from ${previousEmail} to ${updatedUser.email}!`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const token = await getToken(req);

    const user = await UserServices.getUserByToken(token);

    const deletedUser = await UserServices.deleteUser(user.id);

    res.status(200).json({ deletedUser });
  }

};
