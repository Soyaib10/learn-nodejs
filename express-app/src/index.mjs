// imports
import express from "express"

// constant values
const app = express()
const PORT = 3000

app.use(express.json());

const mockUsers = [
    { id: 1, username: "rrid", displayName: "rishan" },
    { id: 2, username: "soyaib", displayName: "zihad" },
    { id: 3, username: "amar valo lage na", displayName: "ha ha" },
    { id: 4, username: "amar olpo valo lage na", displayName: "ha ha" }, 
    { id: 5, username: "amar besi valo lage na", displayName: "ha ha" },
    { id: 6, username: "amar valoi lage na", displayName: "ha ha" },
]

// ---------make get request---------(route, handler)
// home router
app.get("/", (req, res) => {
    res.status(201).send({
        msg: "This is home page"
    })
})

// all users router
// app.get("/api/users", (req, res) => {
//     res.send(mockUsers)
// })

// query params- key value pair with ? at the end of the parameter. Uses for filtering, sorting, searching
app.get("/api/users", (req, res) => {
    console.log(req.query);
    const { query: { filter, value } } = req;

    if (filter && value) {
        return res.send(mockUsers.filter((i) => i[filter].includes(value)));
    }
    return res.send(mockUsers);
});

// route params- get by id or something specific. router for specific user
app.get("/api/users/:id", (req, res) => {
    console.log(req.params)

    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) {
        return res.status(400).send({
            msg: "Bad request, invalid id"
        })
    }

    const findUser = mockUsers.find((i) => i.id === parsedId)
    if (!findUser) {
        return res.sendStatus(404)
    }
    return res.send(findUser)
})

//------------POST-----------------
app.post("/api/users", (req, res) => {
    console.log(req.body)
    const {body} = req
    const newUser = {
        id: mockUsers.length + 1,
        ...body
    }
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
