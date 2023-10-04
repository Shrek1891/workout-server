import express from "express";
import {
    createNewWorkout,
    deleteWorkout,
    getWorkout,
    getWorkouts, updateWorkout,

} from "./workout.controller.js";
import {protect} from "../../middleware/auth.middleware.js";
import {createNewWorkoutLog} from "./workou-log-controller.js";
import {getWorkoutLog} from "./get-workout-log.controller.js";
import {updateCompleteWorkoutLog} from "./update-workout-log.controller.js";

const workoutsRoute = express.Router();

workoutsRoute.route('/').post(protect, createNewWorkout).get(protect, getWorkouts);
workoutsRoute.route('/:id').put(protect, updateWorkout);
workoutsRoute.route('/:id').get(protect, getWorkout);
workoutsRoute.route('/:id').delete(protect, deleteWorkout);
workoutsRoute.route('/log/:id')
    .post(protect, createNewWorkoutLog)
    .get(protect, getWorkoutLog);
workoutsRoute.route('/log/complete/:id').patch(protect, updateCompleteWorkoutLog)
export default workoutsRoute;