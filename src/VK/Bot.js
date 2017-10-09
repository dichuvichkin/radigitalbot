import { vkTypes } from "../Shared/types";
import groups from "./groups";

const Bot = ({ body, res }) => {
  if (body.type === vkTypes.confirmation) {
    const group = groups.find(el => el.group_id === body.group_id);
    res.send(group.answer);
  }
  res.sendStatus(200);
  return {
    handle: type => callback => {
      if (type !== body.type) {
        return;
      }
      callback({
        group_id: body.group_id,
        ...body.object,
      });
    },
  };
};

export default Bot;
