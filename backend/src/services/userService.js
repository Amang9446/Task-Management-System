const jwt = require("jsonwebtoken");
const { User } = require("../models");

class UserService {
  async createUser(userData) {
    const user = await User.create(userData);
    const token = this.generateToken(user.id);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user.id);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.sanitizeUser(user);
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
  }

  sanitizeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

module.exports = new UserService();
