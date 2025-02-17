const fs = require("fs")
const DATA_FILE = "monitoring.json"

const loadChecks = () => {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
}

const saveChecks = (checks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(checks, null, 2))
}

module.exports = {loadChecks, saveChecks}