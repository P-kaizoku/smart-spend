import Router from "express";
import { addExpense, getExpense } from "../controllers/userController";
import { protect } from "../middleware/protect";

const userRouter = Router();

userRouter.get("/", protect, getExpense);
userRouter.post("/", protect, addExpense);

export default userRouter;
