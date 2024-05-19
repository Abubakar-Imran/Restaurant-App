import express from 'express';
import { add_dish, delete_dish, update_dish, get_dishes } from '../controller/menu.js';

const router = express.Router();

router.get("/get_dishes", get_dishes);
router.post("/add_dish", add_dish);
router.put("/update_dish/:id", update_dish);
router.delete("/delete_dish/:id", delete_dish);

export default router;