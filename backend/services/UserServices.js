const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  static async checkIfEmailExists(email) {
    return await User.findOne({ email: email });
  }

  static async addNewUser(newUserData) {
    const user = new User(newUserData);
    return await user.save();
  }

  static async findUserById(id) {
    return await User.findOne({_id: id}).select('-password');
  }

  static async passwordCompare(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }

  static async getUserByToken(token) {
    const decoded = await jwt.verify(token, "testsecret");
    const user = await User.findById(decoded.id);

    return user;
  }

  static async updateUserEmail(user) {
    return await User.findOneAndUpdate(
      { _id: user.id }, // findOne
      { $set: user }, // esse user que veio do controller sobrepoe o user do banco
      {new: true} // retorna o documento atualizado
    )
  }

  static async deleteUser(id) {
    return await User.findByIdAndRemove(id)
  }
};
