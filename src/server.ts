import express from 'express';
import "dotenv/config"
import { userRoutes } from './routes/user.routes';

const app = express()
const port = process.env.PORT || 3330

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", userRoutes)

app.listen(port, () => {
    console.log(`Api is running in port ${port}`)
})