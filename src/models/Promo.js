import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const Promo = sequelize.define(
  "promo",
  {
    userId: {
      type: Sequelize.INTEGER,
    },
    code: Sequelize.STRING,
  },
  {
    timestamps: false,
  },
);

export default Promo;
