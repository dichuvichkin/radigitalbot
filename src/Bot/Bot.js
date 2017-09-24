import { vkTypes } from "./types";

const Bot = ({ confirmString, body, res }) => {
  if (body.type === vkTypes.confirmation) {
    res.send(confirmString);
  }
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
