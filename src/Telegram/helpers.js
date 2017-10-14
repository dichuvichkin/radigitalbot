import User from "../models/User";

export const getUserId = async UserId => {
  const user = await User.find({
    where: { UserId },
  });

  const { id } = user.get({
    plain: true,
  });
  console.log(id);
  return id;
};

export const hey = {};
