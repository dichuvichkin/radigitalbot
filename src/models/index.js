import user from "./User";
import group from "./Group";
import promo from "./Promo";

user.hasMany(group);
user.hasMany(promo);
group.belongsToMany(user, { through: "UserGroup" });
promo.belongsToMany(user, { through: "UserPromo" });

export const User = user;
export const Group = group;
export const Promo = promo;
export { default } from "./Sequlize";
