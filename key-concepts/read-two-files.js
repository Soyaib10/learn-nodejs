const fs = require('fs').promises

async function readFiles() {
    try {
        const file1 = await fs.readFile('sync.txt', 'utf8')
        const file2 = await fs.readFile('async.txt', 'utf8')

        await fs.writeFile(
            './marged-text.txt', 
            `This is merged text: ${file1} ${file2}`, 
            { flag: 'a' }
        );
        console.log(file1, file2)
    } catch(err) {
        console.log('error reading files', err)
    }
}

readFiles()