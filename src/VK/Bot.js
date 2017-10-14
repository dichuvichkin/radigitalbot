import { vkTypes } from "../Shared/types";
import { catchErrors, handleError } from "../Shared/errorHandlers";
import Group from "../models/Group";

const Bot = async ({ body, res }) => {
  if (body.type === vkTypes.confirmation) {
    const group = await Group.find({
      where: { GroupId: body.group_id },
      attributes: ["Answer"],
    });
    const { Answer } = group.get({
      plain: true,
    });
    res.send(Answer);
  }
  return {
    handle: type => async callback => {
      if (type !== body.type) {
        return;
      }
      const [err] = await catchErrors(
        callback({
          group_id: body.group_id,
          ...body.object,
        }),
      );

      if (err) {
        handleError("АШИПКА", err);
      }
      res.sendStatus(200);
    },
  };
};

export default Bot;
