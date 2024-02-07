import express from 'express';
import "dotenv/config"
import { userRoutes } from './routes/user.routes';
import { postRoutes } from './routes/post.routes';
import { categoryRoutes } from './routes/category.routes'
import cookieParser from 'cookie-parser'


export const jwtSecret = 'MinhaChavesecreta'
const app = express()
const port = process.env.PORT || 3330

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/", userRoutes)
app.use("/", postRoutes)
app.use("/", categoryRoutes)

app.listen(port, () => {
    console.log(`Api is running in port ${port}`)
})