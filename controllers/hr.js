import asyncHandler from "express-async-handler";
import Hrmodel from "../models/hrmodel";

/**
 * List All HR data
 * GET /hr
 */
export const listAllHRData = asyncHandler(async (req, res, next) => {
  const hrList = await Hrmodel.find();
  res.status(200).json({ status: "success", data: { hrList } });
});

/**
 * Fetch HR Details
 * GET /hr/:hrid
 */
export const hrDetails = asyncHandler(async (req, res, next) => {
  const { hrid } = req.params;
  const hr = await Hrmodel.findById(hrid);
  res.status(200).json({ status: "success", data: { hr } });
});

/**
 * Update HR Data
 * PATCH /hr/:hrid
 */
export const updateHRData = asyncHandler(async (req, res, next) => {
  const { hrid } = req.params;
  const { name, email, department } = req.body;
  const hr = await Hrmodel.findByIdAndUpdate(hrid, { name, email, department });
  res.status(200).json({ status: "success", data: { hr } });
});

/**
 * Delete HR data
 * DELETE /hr/:hrid
 */
export const deleteHr = asyncHandler(async (req, res, next) => {
  const { hrid } = req.params;
  const hr = await Hrmodel.findByIdAndRemove(hrid);
  res.status(200).json({ status: "success" });
});
