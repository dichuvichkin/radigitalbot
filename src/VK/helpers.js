import axios from "axios";
import methods from "./methods";

export const getData = ({ v = "5.8", vkMethod, ...rest }) =>
  axios
    .get(`https://api.vk.com/method/${vkMethod}`, {
      params: {
        v,
        ...rest,
      },
    })
    .then(({ data }) => data)
    .catch(({ response }) => console.error(response));

export async function getUserAndGroup({
  userData,
  groupData,
  attachments = [],
}) {
  const [users, groups] = await Promise.all([
    getData({
      vkMethod: methods.usersGet,
      ...userData,
    }),
    getData({
      vkMethod: methods.groupsGetById,
      ...groupData,
    }),
  ]);

  const files = attachments.map(
    el => el.type === "photo" && el.photo.photo_604,
  );

  const [user, group] = [
    users.response.find(el => el.id === userData.user_ids),
    groups.response.find(el => el.id === groupData.group_ids),
  ];

  return {
    ...user,
    ...group,
    files
  };
}
