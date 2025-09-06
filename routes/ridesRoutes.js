import express from "express";
import { requestRide } from "../controllers/ridesController.js";

const router = express.Router();

router.post("/rides", requestRide);

export default router;