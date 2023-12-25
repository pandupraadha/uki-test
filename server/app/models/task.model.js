module.exports = (sequelize, Sequelize) => {
  const Tasks = sequelize.define(
    "tasks",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return Tasks;
};
