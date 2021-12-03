const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d03.txt')
})

fileInterface.on('line', line => {
    fileLines.push(line)
})


fileInterface.on('close', () => {
    const recordsCount = fileLines.length
    const recordLength = fileLines[0].length
    const recordMost = new Array()
    const recordLeast = new Array()



    for (let i = 0; i < recordLength; i++) {
        let zeroCount = 0
        let oneCount = 0

        for (let j = 0; j < recordsCount; j++) {
            fileLines[j][i] === '0' ? zeroCount++ : oneCount++
        }

        recordMost.push(zeroCount > oneCount ? 0 : 1)
        recordLeast.push(zeroCount > oneCount ? 1 : 0)
    }

    console.log(recordMost.join(''), recordLeast.join(''))
    console.log(parseInt(recordMost.join(''), 2), parseInt(recordLeast.join(''), 2), parseInt(recordMost.join(''), 2) * parseInt(recordLeast.join(''), 2))
})