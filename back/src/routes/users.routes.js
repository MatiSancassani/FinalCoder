import { Router } from "express";
// import config from "../config.js";
import { validateJWT } from "../middleware/auth.js";
import { handlePolicies } from "../utils/verifys.js";
import { roleChange } from "../controllers/users.controllers.js";
import { getAllUsers } from "../services/users.services.js";


const router = Router();

router.put("/:id/role", validateJWT, handlePolicies(["admin"]), roleChange);
router.get("/", validateJWT, handlePolicies(["admin"]), async (req, res) => {
    const users = await getAllUsers();
});

export default router