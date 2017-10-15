import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const User = sequelize.define("user", {
  UserId: {
    type: Sequelize.FLOAT,
    unique: true,
  },
  Login: Sequelize.STRING,
  payExpiresDay: Sequelize.DATE
});

export default User;
