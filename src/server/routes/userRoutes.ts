/*
 * Defines routes for the User.
 * @author  Isha CHopde
 */
import * as express from "express";
const router = express.Router();
import UserController from "../controllers/userController";
const userController = new UserController();

router.post("/authenticate", userController.authenticate);
router.post("/register", userController.register);
router.get("/current", userController.getCurrent);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
