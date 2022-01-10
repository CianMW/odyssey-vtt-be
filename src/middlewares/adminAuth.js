import createHttpError from "http-errors"


export const adminAuth = async (req, res, next) => {
    const user = req.user
    if(req.user.role === "admin") {
        next()
    }
    else (
        next(createHttpError(401, "unauthorized"))
    )

}
