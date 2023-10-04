import asyncHandler from "express-async-handler";
import {prisma} from "../../prisma.js";
//create new list
export const createNewWorkout = asyncHandler(async (req, res) => {
    const {name, exerciseIds} = req.body;
    const workout = await prisma.workout.create({
        data: {
            name,
            exercises: {
                connect: exerciseIds.map(id => ({id: parseInt(id)}))
            }
        }
    })
    res.json(workout)
})

export const getWorkout = asyncHandler(async (req, res) => {
    const workout = await prisma.workout.findUnique({
        where: {
            id: parseInt(req.params.id),

        },
        include: {
            exercises: true
        }
    });
    if (!workout) {
        res.status(404);
        throw new Error('Not workout')
    }
    const minutes = Math.ceil(workout.exercises.length * 3.7);
    res.json({...workout, minutes})
});

export const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await prisma.workout.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {  //include field 'exercises'
            exercises: true
        }
    });
    res.json(workouts);
})

export const updateWorkout = asyncHandler(async (req, res) => {
    const {name, exerciseIds} = req.body;
    try {
        const workout = await prisma.workout.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name,
                exercises: {
                    set: exerciseIds.map(id => ({id: parseInt(id)}))
                }
            }
        });
        res.json(workout);
    } catch (e) {
        res.status(404);
        throw new Error('Exercise not found');
    }
})

export const deleteWorkout = asyncHandler(async (req, res) => {
    try {
        const workout = await prisma.workout.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json({message: "Delete"})
    } catch (e) {
        console.log(e)
    }
})