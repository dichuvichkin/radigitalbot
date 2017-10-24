import axios from "axios";
// import { tgTypes } from "../Shared/types";

export const init = async ({ body }, res) => {
  // const message = body.message || body.edited_message;
  // const command = message.text.split(" ")[0];
  await axios.post(`http://localhost:${process.env.PORT}/${process.env.TG_TOKEN}/whoAmI`, {
    ...body
  });
  res.sendStatus(200);
};

export const whoAmI = async ({ body }, res) => {
  console.log(body);
  res.sendStatus(200);
};
