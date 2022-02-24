module.exports = app => {
    const user = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Get all users
    router.get("/", user.findAll);

    // Create user
    router.post("/register", user.create);

    router.post("/login", user.login);

    

    app.use('/', router);

}