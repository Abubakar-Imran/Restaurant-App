import express from "express";
import { get_reservation, send_reservation } from "../controller/reservation.js";

const router = express.Router();

router.post("/send", send_reservation);
router.get("/get", get_reservation);

export default router;
