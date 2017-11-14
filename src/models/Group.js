import Sequelize from "sequelize";
import sequelize from "./Sequlize";

const Group = sequelize.define(
    "group",
    {
        userId: Sequelize.INTEGER,
        GroupId: {
            type: Sequelize.FLOAT,
            unique: true
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
