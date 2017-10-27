import { Router } from "express";

import { catchErrors } from "../Shared/errorHandlers";
import {
    init,
    addUserController,
    whoAmIController,
    showGroupsController,
    statusController,
    addGroupController
} from "../controllers/tgController";
import { tgCommands } from "../Shared/types";

const router = Router();

router.post("/", catchErrors(init));

router.post(tgCommands.start, catchErrors(addUserController));

router.post(tgCommands.whoAmI, catchErrors(whoAmIController));

router.post(tgCommands.showGroups, catchErrors(showGroupsController));

router.post(tgCommands.status, catchErrors(statusController));

router.post(tgCommands.addGroup, catchErrors(addGroupController));

export default router;
