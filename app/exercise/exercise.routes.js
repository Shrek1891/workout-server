import express from "express";
import {createNewExercise, deleteExercise, getExercises, updateExercise} from "./exercise.controller.js";
import {protect} from "../../middleware/auth.middleware.js";
import {createNewExerciseLog} from "../log/exercise-log.controller.js";
import {getExerciseLog} from "../log/get-exersice-log.js";
import {updateCompleteExerciseLog, updateExerciseLog} from "../log/update-exercise-log.controller.js";

const exerciseRoute = express.Router();

exerciseRoute.route('/').post(protect, createNewExercise).get(protect, getExercises);
exerciseRoute.route('/:id').put(protect, updateExercise);
exerciseRoute.route('/:id').delete(protect, deleteExercise);
exerciseRoute.route("/log/:id")
    .post(protect, createNewExerciseLog)
    .get(protect, getExerciseLog);
exerciseRoute.route('/log/complete:id').patch(protect, updateCompleteExerciseLog);
exerciseRoute.route('/log/time/:id').put(protect, updateExerciseLog);
export default exerciseRoute;