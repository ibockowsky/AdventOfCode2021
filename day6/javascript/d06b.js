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
    let colognes = [...fileLines].map(fish => ({
        count: 1,
        days: fish
    }))

    const days = 256

    for (let i = 1; i <= days; i++) {
        colognes = colognes.map(obj => ({ ...obj, days: obj.days - 1 }))

        let toBirth = colognes.filter(obj => obj.days < 0)
        colognes = colognes.filter(obj => obj.days >= 0)

        if (toBirth.length) {
            let index = colognes.findIndex(obj => obj.days === 6)

            toBirth.forEach(obj => {
                if (index > -1) colognes[index].count += obj.count
                else colognes.push({ days: 6, count: obj.count })
                colognes.push({ days: 8, count: obj.count })
            })
        }
    }

    console.log(colognes.reduce((prev, curr) => prev += curr.count, 0))
})