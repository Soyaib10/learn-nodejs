import mockUsers from "./constants.mjs"

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

export default resolveIndexByUserId