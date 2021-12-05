const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d05.txt')
})

fileInterface.on('line', line => {
    fileLines.push(line.split(' -> '))
})

fileInterface.on('close', () => {
    const positions = fileLines.map(el => {
        const [a, b] = el
        return {
            a: a.split(',').map(Number),
            b: b.split(',').map(Number)
        }
    })

    const part1 = positions.filter(el => el.a[0] == el.b[0] || el.a[1] == el.b[1])
    const part2 = positions.filter(el => Math.abs(el.a[0] - el.b[0]) === Math.abs(el.a[1] - el.b[1]))

    const map = Array(999).fill().map(() => Array(999).fill(0))

    part1.forEach(position => {
        let start, end
        if (position.a[0] < position.b[0] || position.a[1] < position.b[1]) {
            start = position.a
            end = position.b
        } else {
            start = position.b
            end = position.a
        }

        for (let i = start[0]; i <= end[0]; i++) {
            for (let j = start[1]; j <= end[1]; j++) {
                map[i][j]++
            }
        }
    })

    part2.forEach(position => {
        const iDirection = position.a[0] > position.b[0] ? -1 : 1
        const jDirection = position.a[1] > position.b[1] ? -1 : 1

        let i = position.a[0]
        let j = position.a[1]
        map[i][j]++

        while (i != position.b[0] && j != position.b[1]) {
            i += iDirection
            j += jDirection
            map[i][j]++
        }
    })

    console.log(map.reduce((prev, curr) => prev += curr.filter(el => el >= 2).length, 0))
})