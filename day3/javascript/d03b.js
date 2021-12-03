const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d03.txt')
})

fileInterface.on('line', line => {
    fileLines.push(line)
})

const findBit = (toFind = 'most') => {
    let recordsMost = new Array(...fileLines)

    let i = 0

    while (recordsMost.length > 1) {
        let zeroCount = 0
        let oneCount = 0

        recordsMost.forEach(record => {
            +record[i] === 0 ? zeroCount++ : oneCount++
        })

        const filter = toFind === 'most'
            ? oneCount >= zeroCount ? 1 : 0
            : oneCount >= zeroCount ? 0 : 1

        recordsMost = recordsMost.filter(record => +record[i] === filter)
        i++
    }

    return parseInt(recordsMost[0], 2)
}

fileInterface.on('close', () => {
    console.log(findBit('most'), findBit('least'), findBit('most') * findBit('least'))
})