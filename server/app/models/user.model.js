module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      passwordSalt: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return Users;
};
