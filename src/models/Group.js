import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const Group = sequelize.define(
  "group",
  {
    userId: {
        type: Sequelize.INTEGER,
    },
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
    userId: 1,
    GroupId: 22,
    Answer: "hey",
  });
});

export default Group;
