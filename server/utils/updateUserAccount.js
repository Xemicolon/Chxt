const User = require("./../models/User");
const { hashPassword } = require("./bcrypt");

class UpdateUser {
  constructor(username, email, phone_no, newPassword, confirmPassword) {
    this.username = username;
    this.email = email;
    this.phone_no = phone_no;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }

  async getUser() {
    const user = await User.findOne({ username: this.username });
    if (user) {
      return user;
    }
  }

  async updateEmail() {
    if (!this.email) {
      return this.getUser();
    }

    const updateUserEmail = await User.findOneAndUpdate(
      { username: this.username },
      {
        email: this.email,
      }
    );
    updateUserEmail.save();
    return this.getUser();
  }

  async updatePhone() {
    if (!this.phone_no) {
      return this.getUser();
    }

    const updateUserPhoneNo = await User.findOneAndUpdate(
      { username: this.username },
      {
        phone_no: this.phone_no,
      }
    );
    updateUserPhoneNo.save();
    return this.getUser();
  }

  async updatePassword() {
    if (!this.newPassword) {
      return this.getUser();
    }
    const user = await this.getUser();
    const hashedPassword = hashPassword(this.newPassword, user);

    const updateUserPassword = await User.findOneAndUpdate(
      { username: this.username },
      {
        password: hashedPassword,
      }
    );
    updateUserPassword.save();
    return this.getUser();
  }
}

module.exports = {
  UpdateUser,
};
