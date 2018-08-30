/*
 * Defines routes for the User.
 * @author  Isha CHopde
 */
import * as express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index", { title: "Express" });
  });

export default router;
