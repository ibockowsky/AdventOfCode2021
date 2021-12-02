const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('./inputs/d02.txt')
})

fileInterface.on('line', line => {
    const [command, value] = line.split(" ")
    fileLines.push({ command, value: +value })
})

fileInterface.on('close', () => {
    const position = {
        horizontal: 0,
        depth: 0
    }

    fileLines.forEach(({ command, value }) => {
        switch (command) {
            case 'forward':
                position.horizontal += value
                break
            case 'up':
                position.depth -= value
                break
            case 'down':
                position.depth += value
        }
    })

    console.log(position, position.horizontal * position.depth)
})

