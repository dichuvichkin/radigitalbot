import { Router } from "express";
import { catchErrors } from "../Shared/errorHandlers";

import { mainController, confirmationController, wallReplyNewController } from "../controllers/vkController";

const router = Router();

router.post("/",
    catchErrors(confirmationController),
    catchErrors(mainController)
);

router.post("/wallReplyNew", catchErrors(wallReplyNewController));

export default router;
