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
        .slice(3).reduce((previous, current) => Object.assign(previous, {
            sum: previous.prev1 + previous.prev2 + current,
            prev0: previous.prev1,
            prev1: previous.prev2,
            prev2: current,
            count: previous.count + (previous.prev1 + previous.prev2 + current > previous.sum ? 1 : 0)
        }), {
            sum: fileLines[0] + fileLines[1] + fileLines[2],
            prev0: fileLines[0],
            prev1: fileLines[1],
            prev2: fileLines[2],
            count: 0
        })
    console.log(answer)
})