// imports
import express from "express"
import routes from "./routers/index.mjs"
import cookieParser from "cookie-parser"
import session from "express-session"
import mongoose from "mongoose"

// constant values
const app = express()
const PORT = 3000

mongoose.connect("mongodb://localhost/express-app")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(`Error: ${err}`))

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 },
}));
app.use(routes)

// -------------Get------------------
// home router
app.get("/", (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = true
    res.cookie("hello", "world", { maxAge: 60000 })
    res.status(201).send({ msg: "This is home page" })
})

// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
