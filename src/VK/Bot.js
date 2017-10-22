import { vkTypes } from "../Shared/types";
import { catchErrors, handleError } from "../Shared/errorHandlers";
import { confirmBot, checkPay } from "./helpers";

const Bot = async ({ body, res }) => {
  if (body.type === vkTypes.confirmation) {
    await confirmBot(body, res);
  }
  const users = await checkPay(body);
  if (!users) {
    res.sendStatus(200);
    return null;
  }
  return {
    handle: type => async callback => {
      if (type !== body.type) {
        return;
      }
      const [err] = await catchErrors(
        callback({
          group_id: body.group_id,
          users,
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
