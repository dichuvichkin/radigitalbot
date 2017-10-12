import User from "../models/User";
import Group from "../models/Group";

export const addUser = async ({ message }) => {
  await User.sync({ force: true });
  const res = await User.create(
    {
      UserId: message.from.id,
      Login: message.from.username,
    },
    {
      include: [Group],
    },
  );
  console.log(res);
};

export const whoAmI = async ({ message }) => {
  const res = await User.findOne({
    where: { UserId: message.from.id },
    attributes: ["UserId", "Login"],
  });

  console.log(
    res.get({
      plain: true,
    }),
  );
};
