import { Router } from "express";
import { catchErrors } from "../Shared/errorHandlers";

import {/*  init, */ confirmationController } from "../controllers/vkController";

const router = Router();

router.post("/",
    catchErrors(confirmationController)
);

router.post("/confirmation", catchErrors(confirmationController));

export default router;
