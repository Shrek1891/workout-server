import express from "express";
import authRoutes from "./app/auth/auth.routes.js";
import morgan from "morgan";
import * as dotenv from "dotenv";
import {prisma} from "./prisma.js";
import {errorHandler, notFound} from "./middleware/error.js";
import userRoute from "./app/user/user.routes.js";
import exerciseRoute from "./app/exercise/exercise.routes.js";
import * as path from "path";
import workoutsRoute from "./app/workout/workout.routes.js";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();


async function main() {
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    const __dirname = path.resolve();
    app.use(cors());
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
    app.use(express.json());
    app.use('/app/auth', authRoutes);
    app.use('/app/user', userRoute);
    app.use('/app/exercises', exerciseRoute);
    app.use('/app/workouts', workoutsRoute);
    app.use(notFound);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

await main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })