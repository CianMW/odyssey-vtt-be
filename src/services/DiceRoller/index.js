import express from "express";
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { HttpError } from "http-errors";

const diceRouter = express.Router() 

diceRouter
    .get("/", async (req, res, next) => {
        try {
            const notation = req.body.notation
            const result = new DiceRoll(notation)

            if (result) {
                console.log(result)
                res.status(200).send("you rolled a " + result)
            }

        } catch (error) {
            console.log(error)
            next(HttpError(400))

        }
    })



export default diceRouter