// imports
import express from "express"
import routes from "./routers/index.mjs"

// constant values
const app = express()
const PORT = 3000

app.use(express.json())
app.use(routes)

// -------------Get------------------
// home router
app.get("/", (req, res) => {
    res.status(201).send({
        msg: "This is home page"
    })
})

// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
