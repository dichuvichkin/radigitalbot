import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const AdminPromo = sequelize.define(
  "admin_promo",
  {
    code: Sequelize.STRING,
  },
  {
    timestamps: false,
  },
);

export default AdminPromo;
