// imports
import express from "express"
import { query, validationResult, body, matchedData } from "express-validator"
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";

// constant values
const app = express()
const PORT = 3000

app.use(express.json());


// --------------MiddleWare-------------
const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
}

const resolveIndexByUserId = (req, res, next) => {
    const { body } = req
    const { id } = req.params

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex(i => i.id === parsedId)
    if (findUserIndex === -1) return res.sendStatus(404)
    req.findUserIndex = findUserIndex
    next()
}

const mockUsers = [
    { id: 1, username: "rrid", displayName: "rishan" },
    { id: 2, username: "soyaib", displayName: "zihad" },
    { id: 3, username: "amar valo lage na", displayName: "ha ha" },
    { id: 4, username: "amar olpo valo lage na", displayName: "ha ha" },
    { id: 5, username: "amar besi valo lage na", displayName: "ha ha" },
    { id: 6, username: "amar valoi lage na", displayName: "ha ha" },
]

// -------------Delete------------------
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const findUserIndex = req.findUserIndex
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(204)
})

// -------------Patch------------------
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req
    if (Object.keys(body).length === 0) return res.status(400).send({ msg: "No data to update" });
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }

    return res.sendStatus(200)
})

// --------------PUT------------------
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
    return res.sendStatus(200)
})

//------------POST-----------------
// basic requrirements- 1. get the body, 2. 
app.post("/api/users", createUserValidationSchema, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const data = matchedData(req)
        const newUser = {
            id: mockUsers.length + 1,
            ...data
        };
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
    }
);


// -------------pagination-------------
// app.get("/api/users", (req, res) => {
//     const { page = 1, limit = 7 } = req.query;

//     const pageNumber = parseInt(page);
//     const limitNumber = parseInt(limit); 

//     // suppose content no = 6, limit no = 2, so for 2nd page start number should be = 3 
//     const startIndex = (pageNumber - 1) * limitNumber;
//     const paginatedUsers = mockUsers.slice(startIndex, startIndex + limitNumber);
//     return res.send(paginatedUsers);
// });

// -------------Get------------------
// home router
app.get("/", (req, res) => {
    res.status(201).send({
        msg: "This is home page"
    })
})

// query params- key value pair with ? at the end of the parameter. Uses for filtering, sorting, searching
app.get("/api/users",
    [
        query("filter")
            .optional()
            .isString()
            .notEmpty().withMessage("Must be not empty")
            .isLength({ min: 3, max: 10 }).withMessage("Must be at least 2-10 charecters long"),
        query("value")
            .optional()
            .isString().withMessage("Value must be a string")
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { query: { filter, value } } = req;
        if (filter && value) {
            return res.send(mockUsers.filter(i => i[filter] && i[filter].toLowerCase().includes(value.toLowerCase())));
        }
        return res.send(mockUsers) // if nothing matches then get all users
    });

// route params- get by id or something specific. router for specific user
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) {
        return res.sendStatus(404)
    }
    return res.send(findUser)
})

// run the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
