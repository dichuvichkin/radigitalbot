import { vkTypes } from "../Shared/types";
import groups from "./groups";

const Bot = ({ body, res }) => {
  if (body.type === vkTypes.confirmation) {
    const group = groups.find(el => el.group_id === body.group_id);
    res.send(group.answer);
  }
  // console.log(body.type)
  return {
    handle: type => callback => {
      if (type !== body.type) {
        return;
      }
      callback({
        group_id: body.group_id,
        ...body.object,
      });
      res.sendStatus(200);
    },
  };
};

export default Bot;
