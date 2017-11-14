import { Router } from "express";

import { catchErrors } from "../Shared/errorHandlers";
import {
    init,
    addUserController,
    whoAmIController,
    showGroupsController,
    statusController,
    addGroupController,
    deleteGroupController,
    promoController
} from "../controllers/tgController";
import { tgCommands } from "../Shared/types";

const router = Router();

router.post("/", catchErrors(init));

router.post(tgCommands.start, catchErrors(addUserController));

router.post(tgCommands.whoAmI, catchErrors(whoAmIController));

router.post(tgCommands.showGroups, catchErrors(showGroupsController));

router.post(tgCommands.status, catchErrors(statusController));

router.post(tgCommands.addGroup, catchErrors(addGroupController));

router.post(tgCommands.deleteGroup, catchErrors(deleteGroupController));

router.post(tgCommands.promo, catchErrors(promoController));

export default router;
