import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const Group = sequelize.define(
  "group",
  {
    GroupId: {
      type: Sequelize.FLOAT,
    },
    Answer: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  },
);

export default Group;
