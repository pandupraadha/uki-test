const {Tasks} = require("../models");

exports.getAll = (req, res) => {
  Tasks.findAll({
    where: {
      userId: req.body.userId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Some error occurred while retrieving tasks.",
      });
    });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  Tasks.findByPk(id, {
    where: {
      userId: req.body.userId,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.name || req.body.name === "") {
    res.status(400).send({
      message: "Task name can not be empty!",
    });
    return;
  }

  const task = {
    name: req.body.name,
    userId: null,
    isCompleted: false,
  };

  Tasks.create(task)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Some error occurred while creating the Task.",
      });
    });
};

exports.assign = (req, res) => {
  const id = req.params.id;

  if (!req.body.staffId || req.body.staffId === "") {
    res.status(400).send({
      message: "Staff can not be empty!",
    });
    return;
  }

  Tasks.update(
    {
      userId: req.body.staffId,
    },
    {
      where: {id: id},
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was assigned successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.complete = (req, res) => {
  const id = req.params.id;

  Tasks.update(
    {
      isCompleted: true,
    },
    {
      where: {id: id},
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was completed successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tasks.destroy({
    where: {id: id},
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
