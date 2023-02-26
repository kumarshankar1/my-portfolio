module.exports = (sequelize, DataTypes) => {
    const contactMe = sequelize.define(
      "contactMe",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        phone: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        resume: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER
        },
      },
      {
        tableName: "contactMe",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return contactMe;
  };