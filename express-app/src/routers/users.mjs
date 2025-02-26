import { Router } from "express";
import {query, validationResult, checkSchema, matchedData} from "express-validator"
import mockUsers from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import resolveIndexByUserId from "../utils/middlewares.mjs"

const router = Router()

// ---------------Get------------------
// query params- key value pair with ? at the end of the parameter. Uses for filtering, sorting, searching
router.get("/api/users", 
    [
        query("filter")
            .optional()
            .isString()
            .notEmpty().withMessage("Must be not empty")
            .isLength({ min: 3, max: 10 }).withMessage("Must be at least 3-10 characters long"),
        query("value")
            .optional()
            .isString().withMessage("Value must be a string")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { query: { filter, value } } = req;
        if (filter && value) {
            return res.send(mockUsers.filter(i => i[filter] && i[filter].toLowerCase().includes(value.toLowerCase())));
        }
        return res.send(mockUsers); // if nothing matches, return all users
    }
)

// -------------pagination-------------
router.get("/api/users", (req, res) => {
    const { page = 1, limit = 1 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit); 

    // suppose content no = 6, limit no = 2, so for 2nd page start number should be = 3 
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginatedUsers = mockUsers.slice(startIndex, startIndex + limitNumber);
    return res.send(paginatedUsers);
});

// route params- get by id or something specific. router for specific user
router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) {
        return res.sendStatus(404)
    }
    return res.send(findUser)
})

//------------POST-----------------
// basic requrirements- 1. get the body, 2. 
router.post("/api/users", createUserValidationSchema, (req, res) => {
        const errors = validationResult(req);
        console.log(errors)
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
)

// -------------Delete------------------
router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const findUserIndex = req.findUserIndex
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(204)
})

// -------------Patch------------------
router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req
    if (Object.keys(body).length === 0) return res.status(400).send({ msg: "No data to update" });
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }

    return res.sendStatus(200)
})

// --------------PUT------------------
router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
    return res.sendStatus(200)
})

export default router