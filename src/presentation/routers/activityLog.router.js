import { Router } from "express";
import * as activityLogController from "../controllers/activityLog.controller.js";
import validation from "../middlewares/validation.js";
import { activityLogSchema, logQuerySchema } from './../validations/activityLogs.validation.js';
const router= Router();

router.post("/logs",validation(activityLogSchema),activityLogController.save)
       .get("/logs",validation(logQuerySchema),activityLogController.getAllLogs)

export default router;