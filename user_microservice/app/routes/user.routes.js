const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.post("/user/", controller.create);

  app.put(
    "/user/",
    controller.update
  );

  app.get(
    "/user/",
    controller.getUserList
  );
};
