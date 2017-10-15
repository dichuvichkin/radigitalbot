import Sequelize from "sequelize";
import sequelize from "./Sequlize";
import Group from "./Group";
import Promo from "./Promo";

const User = sequelize.define("user", {
  UserId: {
    type: Sequelize.FLOAT,
    unique: true,
  },
  Login: Sequelize.STRING,
  payExpiresDay: Sequelize.DATE
});

User.hasMany(Group);
User.hasMany(Promo);

export default User;
