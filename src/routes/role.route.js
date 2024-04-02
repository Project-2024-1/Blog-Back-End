import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addRole, deleteManyRole, deleteRole, getRole } from "../controller/role.controller.js";

const router = express.Router();

router.get("/",checkAuthorization, getRole);
router.post("/addRole", addRole);
router.delete("/deleteRole", deleteRole);
router.delete("/deleteManyRole", deleteManyRole);

export default router;