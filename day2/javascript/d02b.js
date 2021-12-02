const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d02.txt')
})

fileInterface.on('line', line => {
    const [command, value] = line.split(" ")
    fileLines.push({ command, value: +value })
})

fileInterface.on('close', () => {
    const state = {
        horizontal: 0,
        depth: 0,
        aim: 0
    }

    fileLines.forEach(({ command, value }) => {
        switch (command) {
            case 'forward':
                state.horizontal += value
                state.depth += state.aim ? value * state.aim : 0
                break
            case 'up':
                state.aim -= value
                break
            case 'down':
                state.aim += value
        }
    })

    console.log(state, state.horizontal * state.depth)
})

