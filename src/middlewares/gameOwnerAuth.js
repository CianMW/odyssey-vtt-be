import createHttpError from "http-errors"
import GameModel from "../services/Games/schema.js"


export const gameOwnerAuth = async (req, res, next) => {
    const user = req.user
    const gameId = req.params.gameId;
    const foundGame = await GameModel.findById(gameId)

    if(foundGame.ownerId.toString() === req.user._id.toString() || req.user.role === "admin") {
        next()
    }
    else (
        next(createHttpError(401, "unauthorized"))
    )

}
