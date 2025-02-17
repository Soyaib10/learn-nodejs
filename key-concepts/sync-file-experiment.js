const fs = require('fs');

const startTime = Date.now()
fs.writeFileSync("syncText.txt", "Hello to like e, hello to like e")

let cnt = 0
for (let i = 0; i < 100000; i++) {
    cnt++;
}

const endTime = Date.now()
console.log(`Synchronous approach took ${endTime - startTime} ms`);