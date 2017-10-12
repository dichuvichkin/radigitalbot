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

Group.sync({ force: true }).then(() => {
  Group.create({
    GroupId: 22,
    Answer: "hey",
  });
});

export default Group;
