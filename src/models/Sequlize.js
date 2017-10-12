import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// sequelize.sync({ force: true }).then(() => {
//   console.log("All models are synchronized");
// });

export default sequelize;
