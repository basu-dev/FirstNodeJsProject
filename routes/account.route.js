const express = require("express");
const router = express.Router();
const userController = require("../controllers/account.controller");


  router.route("/registerUser").post(userController.registerUser),

  router.route("/users").get(userController.getAllUsers),
  router
    .route("/users/:id")
    .get(userController.getSingleUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser),


  (module.exports = router);
