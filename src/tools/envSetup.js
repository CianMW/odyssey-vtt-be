import dotenv from "dotenv/config"

export const mongo_test_url = process.env.MONGO_DB_URL_TEST
export const mongo_db = process.env.MONGO_DB_URL
export const PORT = process.env.PORT