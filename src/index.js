import { httpServer } from "./server.js"
import app from "./app.js";
import mongoose from "mongoose"
import dotenv from "dotenv/config";
import listEndpoints from "express-list-endpoints";
import { PORT } from "./tools/envSetup.js";

const port = PORT || 3000;

console.log(process.env.MONGO_DB_URL)
    
mongoose.connect(process.env.MONGO_DB_URL)


mongoose.connection.on("connected", () => {

  console.log("Mongo Connected!")

  httpServer.listen(port, () => {
    console.table(listEndpoints(app))

    console.log(`Server running on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})