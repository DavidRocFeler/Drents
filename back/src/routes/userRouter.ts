import { Router } from "express";
import { getAllUserController, getUserByIdController, loginController, registerController } from "../controllers/userController";
import userValidate from "../middlewares/userValidate";
import credentialValidate from "../middlewares/credentialValidate";

const userRouter: Router = Router();

userRouter.get("/", getAllUserController);
userRouter.get("/:id", getUserByIdController);
userRouter.post("/register",userValidate, registerController);
userRouter.post("/login",credentialValidate, loginController);

export default userRouter;
