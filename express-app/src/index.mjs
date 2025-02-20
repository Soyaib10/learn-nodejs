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

// -------------Delete------------------
app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex(i => i.id === parsedId)
    if (findUserIndex === -1) return res.sendStatus(404)
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(204)
})

// -------------Patch------------------
app.patch("/api/users/:id", (req, res) => {
    const { body } = req
    const { id } = req.params

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex(i => i.id === parsedId)
    if (findUserIndex === -1) return res.sendStatus(404)
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    if (Object.keys(body).length === 0) return res.status(400).send({ msg: "No data to update" });
    return res.sendStatus(200)
})

// --------------PUT------------------
app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex(i => i.id === parsedId)
    if (findUserIndex === -1) return res.sendStatus(404)
    mockUsers[findUserIndex] = { id: parsedId, ...body }
    return res.sendStatus(200)
})

//------------POST-----------------
// basic requrirements- 1. get the body, 2. 
app.post("/api/users", (req, res) => {
    console.log(req.body)
    const { body } = req
    const newUser = {
        id: mockUsers.length + 1,
        ...body
    }
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

// -------------pagination-------------
app.get("/api/users", (req, res) => {
    const { page = 1, limit = 1 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit); 

    // suppose content no = 6, limit no = 2, so for 2nd page start number should be = 3 
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginatedUsers = mockUsers.slice(startIndex, startIndex + limitNumber);
    return res.send(paginatedUsers);
});


// -------------Get------------------
// home router
app.get("/", (req, res) => {
    res.status(201).send({
        msg: "This is home page"
    })
})

// query params- key value pair with ? at the end of the parameter. Uses for filtering, sorting, searching
app.get("/api/users", (req, res) => {
    //initial
    console.log(req.query);
    const { query: { filter, value } } = req;
    if (filter && value) {
        return res.send(mockUsers.filter(i => i[filter] && i[filter].toLowerCase().includes(value.toLowerCase())));
    }
    return res.send(mockUsers) // if nothing matches then get all users
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

// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
