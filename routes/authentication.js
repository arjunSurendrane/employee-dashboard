import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Authentication route");
});

export default router;
