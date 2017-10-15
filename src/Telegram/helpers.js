import moment from "moment";
import { User } from "../models";

export const getUserId = async UserId => {
  const user = await User.find({
    where: { UserId },
  });

  const { id } = user.get({
    plain: true,
  });
  return id;
};

export const setExpireDate = (quontity, type = "minutes") =>
  moment().add(quontity, type);

export const isAccountPaid = async UserId => {
  const userData = await User.find({
    where: { UserId },
    attributes: ["payExpiresDay"],
  });

  const { payExpiresDay } = userData.get({
    plain: true,
  });

  return moment(payExpiresDay).diff(moment()) > 0;
};
