const { readFileSync, writeFileSync } = require("fs");

console.log('start');
const first = readFileSync('./syncText.txt', 'utf-8')
const second = readFileSync('./asyncText.txt', 'utf-8')

writeFileSync(
    './syncText.txt', `Here is the result: ${first}, ${second}`, { flag: 'a' }
)

console.log('done with the task');
console.log('starting next one');