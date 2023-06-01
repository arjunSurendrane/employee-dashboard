import express from "express";
import {
  deleteHr,
  hrDetails,
  listAllHRData,
  updateHRData,
} from "../controllers/hr.js";
const router = express.Router();

router.get("/", listAllHRData);

router.route("/:hrid").get(hrDetails).patch(updateHRData).delete(deleteHr);

export default router;
