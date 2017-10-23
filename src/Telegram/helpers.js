import moment from "moment";
import { User } from "../models";

export const getUserId = async UserId => {
  const user = await User.find({
    where: { UserId },
  });

  return user.get("id");
};

export const setExpireDate = (quontity, type = "minutes") =>
  moment().add(quontity, type);
