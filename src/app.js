import express from "express";
import cors from "cors";
import usersRouter from "./services/users/index.js";
import gamesRouter from "./services/Games/index.js";

import characterRouter from "./services/Characters/index.js";

import diceRouter from "./services/DiceRoller/index.js";

const app = express();

app.use(cors("*"))

app.use(express.json())

app.use('/user', usersRouter)
app.use('/game', gamesRouter)
app.use('/character', characterRouter)
app.use('/dice', diceRouter)


app.get('/test', (req, res) => {
    res.status(200).send({ message: "Test successful" });
})


export default app 