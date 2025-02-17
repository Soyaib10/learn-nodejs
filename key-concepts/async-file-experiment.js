const fs = require('fs');

const startAsync = Date.now();

fs.writeFile('asyncTest.txt', 'Hello, this is an async file write test!', (err) => {
    if (err) throw err;

    let cnt = 0;
    for (let i = 0; i < 100000; i++) {
        cnt++;
    }

    const endAsync = Date.now();
    console.log(`Asynchronous approach took ${endAsync - startAsync} ms`);
});
