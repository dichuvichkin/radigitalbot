import axios from "axios";

export const postData = (token = "", id = "121754413") => type => (
  data = {},
) => {
  axios
    .post(`https://api.telegram.org/bot${token}/${type}`, {
      chat_id: id,
      ...data,
    })
    .then(response => response)
    .catch(error => {
      console.log(error);
    });
};

export const hey = {};
