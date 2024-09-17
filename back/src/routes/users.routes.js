import { Router } from "express";
// import config from "../config.js";
import { validateJWT } from "../middleware/auth.js";
import { handlePolicies } from "../utils/verifys.js";
import { roleChange } from "../controllers/users.controllers.js";
import { getAllUsers } from "../services/users.services.js";
import { verifyAuthoentication } from "../middleware/auth.js";


const router = Router();

router.put("/:id/role", validateJWT, handlePolicies(["admin"]), roleChange);

router.get("/", validateJWT, handlePolicies(["admin"]), async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los usuarios", error });
    }
});

router.get("/profile", validateJWT, handlePolicies(["user", "admin", "premium"]), async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send({ message: "Error al obtener el usuario", error });
    }
});

export default router