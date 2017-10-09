import User from "../models/User";

export const addUser = ({ message }) => {
  User.sync({ force: true }).then(() =>
    User.create({
      UserId: message.from.id,
      Login: message.from.username,
    }),
  );
};

export const whoAmI = ({ message }) => {
  User.findOne({
    where: { UserId: message.from.id },
    attributes: ["UserId", "Login"],
  }).then(res => {
    console.log(
      res.get({
        plain: true,
      }),
    );
  });
};

export const obj = {};
