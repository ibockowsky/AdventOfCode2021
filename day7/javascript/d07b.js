const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d07.txt')
})

fileInterface.on('line', line => {
    fileLines.push(...line.split(',').map(Number))
})

fileInterface.on('close', () => {
    const max = Math.max(...fileLines)
    const min = Math.min(...fileLines)

    let theLeast = Number.MAX_SAFE_INTEGER
    let thePoint = 0

    for (let i = min; i <= max; i++) {
        const tempTheLeast = fileLines.map(distance => {
            let fuel = 0
            const dist = Math.abs(distance - i)

            if (dist > 0) {
                for (let j = 1; j <= dist; j++) {
                    fuel += j
                }
            }

            return fuel
        }).reduce((prev, curr) => prev += curr, 0)

        if (tempTheLeast < theLeast) {
            theLeast = tempTheLeast
            thePoint = i
        }
    }
    console.log(theLeast, thePoint)
})