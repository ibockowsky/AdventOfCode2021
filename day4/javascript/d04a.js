const fs = require('fs')
const readline = require('readline')

const fileLines = []

const fileInterface = readline.createInterface({
    input: fs.createReadStream('../../inputs/d04.txt')
})

fileInterface.on('line', line => {
    fileLines.push(line)
})

const createBingoGrid = (gridValues) => {
    const grid = Object.create({
        row_1: null,
        row_2: null,
        row_3: null,
        row_4: null,
        row_5: null,
    })

    gridValues.forEach((rowValues, index) => {
        const gridRow = Object.create({})
        const row = rowValues.split(' ').filter(el => el !== '')
        row.forEach((number, _index) => {
            gridRow[number] = {
                highlighted: false,
                column: _index + 1
            }
        })
        grid[`row_${index + 1}`] = gridRow
    })

    return grid
}

const checkRows = (board) => {
    for (let i = 0; i < 5; i++) {
        const row = board[`row_${i + 1}`]
        if (Object.values(row).map(number => number.highlighted).every(number => number))
            return true
    }
    return false
}
const checkCols = (board) => {
    for (let i = 0; i < 5; i++) {
        const column = new Array()
        for (let j = 0; j < 5; j++) {
            const row = board[`row_${j + 1}`]
            for (let key of Object.keys(row)) {
                if (row[key].column === i + 1) column.push(row[key])
            }
        }
        if (column.map(number => number.highlighted).every(number => number))
            return true
    }

    return false
}

fileInterface.on('close', () => {
    const bingoNumbers = fileLines[0].split(',')
    let bingoBoard = null
    let bingoLastNumber = null

    const filteredGridNumbers = fileLines.slice(2).filter(line => line !== '')

    const bingoGrids = new Array()
    for (let i = 0; i < filteredGridNumbers.length; i += 5) {
        bingoGrids.push(createBingoGrid(filteredGridNumbers.slice(i, i + 5)))
    }

    for (let i = 0; i <= bingoNumbers.length; i++) {
        if (i >= 5) {
            for (let j = 0; j < bingoNumbers.length; j++) {
                const isBingo = checkRows(bingoGrids[j]) || checkCols(bingoGrids[j])

                if (isBingo) {
                    bingoBoard = bingoGrids[j]
                    break
                }
            }

            if (bingoBoard) break
        }

        bingoGrids.forEach(grid => {
            Object.keys(grid).forEach(key => {
                Object.keys(grid[key]).forEach(gridNumber => {
                    if (gridNumber === bingoNumbers[i]) grid[key][gridNumber].highlighted = true
                })
            })
        })
        bingoLastNumber = bingoNumbers[i]
    }

    const highlightedNumbers = new Array()
    const nonHighlightedNumbers = new Array()

    Object.values(bingoBoard).forEach(numbers => Object.keys(numbers).forEach(number => numbers[number].highlighted ? highlightedNumbers.push(number) : nonHighlightedNumbers.push(number)))

    console.log(bingoLastNumber, nonHighlightedNumbers.reduce((prev, curr) => prev += +curr, 0), bingoLastNumber * nonHighlightedNumbers.reduce((prev, curr) => prev += +curr, 0))
})