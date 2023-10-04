import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {prisma} from "../prisma.js";


export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const userFound = await prisma.user.findUnique({
            where: {
                id: parseInt(decoded.userId)
            },
            select: {
                id: true,
                createAt: true,
                email: true,
                image: true,
                updatedAt: true,
                name: true
            }
        })
        if (userFound) {
            req.user = userFound;
            next()
        } else {
            res.status(401);
            throw  new Error('Not authorized, token filed')
        }
        if (!token) {
            res.status(401)
            throw new Error('I do not have token')
        }
    }
})