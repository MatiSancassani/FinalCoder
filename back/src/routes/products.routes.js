import { Router } from "express";
import {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { validateJWT } from "../middleware/auth.js";

const router = Router();

router.get("/", validateJWT, getProduct);
router.get("/:pid", validateJWT, getProductById);
router.post("/", validateJWT, addProduct);
router.put("/:pid", validateJWT, updateProduct);
router.delete("/:pid", validateJWT, deleteProduct);

export default router;
