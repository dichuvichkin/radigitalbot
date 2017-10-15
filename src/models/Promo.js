import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const Promo = sequelize.define("promo", {
  userId: Sequelize.INTEGER,
  code: Sequelize.STRING,
});

export default Promo;
