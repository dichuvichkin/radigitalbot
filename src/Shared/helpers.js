import axios from "axios";

import { catchErrors, handleError } from "./errorHandlers";

export const postData = (token = "", id = "121754413") => type => async (
    data = {},
) => {
    const [err] = catchErrors(
        axios.post(`https://api.telegram.org/bot${token}/${type}`, {
            chat_id: id,
            ...data,
        }),
    );
    if (err) {
        handleError(err);
    }
};

export const hey = {};
