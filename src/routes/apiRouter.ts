import { Router } from "express"
// import * as apiController from "../controllers/apiController"

export const router = Router()

router.get("/", (req, res) => {
  res.send("Home")
})
