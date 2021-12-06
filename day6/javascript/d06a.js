const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d06.txt')
})

fileInterface.on('line', line => {
    fileLines.push(...line.split(',').map(Number))
})

fileInterface.on('close', () => {
    let lanternFishDays = [...fileLines]
    const days = 80

    for (let i = 0; i < days; i++) {
        let fishesToAdd = 0
        lanternFishDays = lanternFishDays.map(fish => {
            let newFishDays = 0
            if (fish === 0) {
                fishesToAdd++
                newFishDays = 6
            } else
                newFishDays = fish - 1

            return newFishDays
        })
        lanternFishDays = [...lanternFishDays, ...Array(fishesToAdd).fill(8)]
    }

    console.log(lanternFishDays.length)
})