import { Router } from "express";

import { catchErrors } from "../Shared/errorHandlers";
import { init, whoAmI } from "../controllers/tgController";

const router = Router();

router.post("/", catchErrors(init));

router.post("/whoAmI", catchErrors(whoAmI));

export default router;
