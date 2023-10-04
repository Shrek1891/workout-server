import asyncHandler from "express-async-handler";
import {prisma} from "../../prisma.js";
//create new item
export const createNewExercise = asyncHandler(async (req, res) => {
    const {name, times, iconPath} = req.body
    const exercise = await prisma.exercise.create({
        data: {
            name,
            times: parseInt(times),
            iconPath
        }
    })

    res.json(exercise)
})

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
export const getExercises = asyncHandler(async (req, res) => {
    const exercises = await prisma.exercise.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.json(exercises)
})

export const updateExercise = asyncHandler(async (req, res) => {
    const {name, times, iconPath} = req.body;
    try {
        const exercise = await prisma.exercise.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name,
                times,
                iconPath
            }
        });
        res.json(exercise);
    } catch (e) {
        res.status(404);
        throw new Error('Exercise not found');
    }
})

export const deleteExercise = asyncHandler(async (req, res) => {
    try {
        const exercise = await prisma.exercise.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json({message: "Delete"})
    } catch (e) {
        console.log(e)
    }
})