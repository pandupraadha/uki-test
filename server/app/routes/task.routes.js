const {verifyToken, isAdmin} = require("../middlewares/auth");

module.exports = (app) => {
  const taskController = require("../controllers/task.controller");
  let router = require("express").Router();

  router.get("/", verifyToken, taskController.getAll);
  router.get("/:id", verifyToken, taskController.getOne);
  router.post("/", verifyToken, isAdmin, taskController.create);
  router.patch("/:id/assign", verifyToken, isAdmin, taskController.assign);
  router.patch("/:id/complete", verifyToken, isAdmin, taskController.complete);
  router.delete("/:id", verifyToken, isAdmin, taskController.delete);

  app.use("/tasks", router);
};
