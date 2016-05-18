#!/usr/bin/env node

const gen = require('./src/generate_maze.js')

const ROWS = Number.parseInt(process.argv[2], 10)
const COLS = Number.parseInt(process.argv[3], 10)

const grid = (_ => {
  const g = []
  for(let i = 0; i < ROWS; i++) {
    let row = []
    for(let j = 0; j < COLS; j++) {
      row.push('█')
    }
    g.push(row)
  }
  return g
})()

gen(
  ROWS,
  COLS,
  [1,1],
  (x, y) => {
    grid[y][x] = ' '
  }
)

grid.forEach(row => {
  console.log(row.join(''))
})

