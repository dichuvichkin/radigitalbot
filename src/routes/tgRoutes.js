import { Router } from "express";

import { catchErrors } from "../Shared/errorHandlers";
import { init, whoAmIController, showGroupsController } from "../controllers/tgController";
import { tgCommands } from "../Shared/types";

const router = Router();

router.post("/", catchErrors(init));

router.post(tgCommands.whoAmI, catchErrors(whoAmIController));

router.post(tgCommands.showGroups, catchErrors(showGroupsController));

export default router;
