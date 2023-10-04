import {prisma} from "../../prisma.js";
import asyncHandler from "express-async-handler";
import {generateToken} from "../generate-token.js";
import argon2, {verify} from 'argon2';


export const registerUser = asyncHandler(async (req, res) => {
    const {email, password, name} = req.body;
    console.log(req.body)
    const isHaveUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (isHaveUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await argon2.hash(password)
        },
        select: {
            id: true,
            createAt: true,
            email: true,
            image: true,
            updatedAt: true,
            name: true
        }
    });

    const token = generateToken(user.id);
    res.json({user, token})
})
export const authUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    const isValidPassword = await verify(user.password, password);
    if (user && isValidPassword) {
        const token = generateToken(user.id);
        res.json({user, token})
    } else {
        res.status(401);
        throw new Error('Email and password are not correct');
    }

};