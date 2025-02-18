// imports
import express from "express"

// constant values
const app = express();
const PORT = 3000
const mockUsers = [
    { id: 1, username: "rrid", displayName: "rishan" },
    { id: 2, username: "soyaib", displayName: "zihad" },
    { id: 3, username: "amar valo lage na", displayName: "ha ha" },
]

// ---make get request- (route, handler)
// home router
app.get("/", (req, res) => [
    res.status(201).send({
        msg: "this is home page"
    })
])

// all users router
app.get("/api/users", (req, res) => {
    res.send(mockUsers)
})

// route params- get by id or something specific
// single user router
app.get("/api/users/:id", (req, res) => {
    console.log(req.params)

    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) {
        return res.status(400).send({
            msg: "Bad request, invalid id"
        })
    }

    const findUser = mockUsers.find((i) => {i.id === parsedId})
    if (!findUser) {
        return res.sendStatus(404)
    }
    return res.send(findUser)
})




// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
