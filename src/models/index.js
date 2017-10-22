import user from "./User";
import group from "./Group";
import promo from "./Promo";
import adminPromo from "./AdminPromo";

user.hasMany(group);
user.hasMany(promo);
group.belongsToMany(user, {
  through: "group_users",
});
promo.belongsToMany(user, {
  through: "promo_users",
});

export const User = user;
export const Group = group;
export const Promo = promo;
export const AdminPromo = adminPromo;
export { default } from "./Sequlize";
