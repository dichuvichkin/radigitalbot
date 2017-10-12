import Sequelize from "sequelize";
import sequelize from "./Sequlize";
import Group from "./Group";

const User = sequelize.define("user", {
  UserId: {
    type: Sequelize.FLOAT,
    unique: true,
  },
  Login: {
    type: Sequelize.STRING,
  },
  HasPaid: {
    type: Sequelize.BOOLEAN
  },
  PayDay: {
    type: Sequelize.DATE,
  },
});

User.hasMany(Group);

export default User;
