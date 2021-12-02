const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d01.txt')
})

fileInterface.on('line', line => {
    fileLines.push(+line)
})

fileInterface.on('close', () => {
    const answer = fileLines
        .slice(1).reduce((previous, current) => Object.assign(previous, {
            prev: current,
            count: previous.count + (current > previous.prev ? 1 : 0)
        }), {
            prev: fileLines[0],
            count: 0
        })
    console.log(answer)
})