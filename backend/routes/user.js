const router = require("express").Router();
let User = require("../model/user.model");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", async (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => { res.status(400).json("Error: " + err); console.log("Error while adding user =>" + err); });
});

router.get("/:email/:password", async (req, res) => {
  const user = await User.find({ username: req.params.email, password: req.params.password })
    .catch(err => res.status(400).json("User not found"));

  if (user.length > 0) res.status(200).send(user);
  else res.status(404).json("Invalid email or password");
});



router.post("/add", [
  body("username").isEmail().withMessage("Username/Email is not valid"),
  body("role").isString().withMessage("role should be string only"),
  body("firstname").isString().withMessage("Invalid First Name => First Name should contain characters only")
    .isLength({ min: 3, max: 20 }).withMessage("Invalid First Name => length must be 3-20"),
  body("lastname").isString().withMessage("Invalid Last Name => Last Name should contain characters only")
    .isLength({ min: 3, max: 20 }).withMessage("Invalid Last Name => length must be 3-20"),
  body("mobileno").isNumeric().withMessage("Please enter a valid mobile number")
    .isLength({ min: 10, max: 10 }).withMessage("Mobile no should be of 10 digits"),
  body("password").isLength({ min: 6, max: 15 }).withMessage("Password me of 6-15 characters in length ")
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  const username = req.body.username;
  const role = req.body.role;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const mobileno = req.body.mobileno;
  const password = req.body.password;
  const newUser = new User({ username, role, firstname, lastname, mobileno, password });


  newUser
    .save()
    .then(() => res.status(200).json("User added with username : " + username))
    .catch((err) => res.status(400).json("Error:> " + err));
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => res.status(200).json("User deleted successfully"))
    .catch(err => res.status(400).json("error while deleting user with id:" + id));

});

router.put("/update/:id", [], async (req, res) => {
  const id = req.params.id;
  const newuser = req.body;

  const user = await User.updateOne({ _id: id }, newuser)
    .catch(err => res.status(404).json("Error while updating user with id : " + id));

  res.status(200).send(user);
});

module.exports = router;
