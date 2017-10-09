import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const User = sequelize.define(
  "user",
  {
    UserId: {
      type: Sequelize.FLOAT,
    },
    Login: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  },
);

export default User;