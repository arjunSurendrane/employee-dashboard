import express from "express";
import { incrimentBonus, salaryIncriment } from "../controllers/salary";
const router = express.Router();

router.patch("/:empid/incriment", salaryIncriment);
router.patch("/:empid/bonus", incrimentBonus);

export default router;
