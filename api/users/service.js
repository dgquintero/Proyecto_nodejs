// const User = require("../../model/Users");
const userCtrl = {};
const User = require("../../model/Users");
const passport = require("passport");

userCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

userCtrl.signup = async (req, res) => {
  const errors = [];
  const { body: data } = req;

  if (data.password != data.confirm_password) {
    errors.push({ text: "Los passwords deben de coincidir" });
  }
  if (data.password.length < 6) {
    errors.push({ text: "El password debe de ser mayor a 6 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name: data.name,
      email: data.email,
    });
  } else {
    const findEmail = await User.findOne({ email: data.email });
    if (findEmail) {
      req.flash("error_msg", "El correo ya esta en uso");
      res.redirect("/signup");
    } else {
      const user = new User(req.body);
      user.password = await user.encryptPassword(data.password);
      await user.save();
      req.flash("success_msg", "Register successfully");
      res.send("ok");
    }
  }
};

module.exports = userCtrl;
