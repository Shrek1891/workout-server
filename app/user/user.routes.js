import express from "express";
import {getAllUser, getUserProfile} from "./user.controller.js";
import {protect} from "../../middleware/auth.middleware.js";

const userRoute = express.Router();

userRoute.route('/profile').get( protect, getUserProfile);
userRoute.route('/profile/all').get(getAllUser);

export default userRoute;