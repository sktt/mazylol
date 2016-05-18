const shuffle = arr => arr.sort(_ => Math.random() - 0.5)

/**
 * Maze generator visits nodes in a grid with a given number of rows and columns
 * Visiting using depth first with some randomization. Calls `visit(x,y)` for
 * every visited node.
 *
 * @param {number} rows number of rows
 * @param {number} cols number of columns
 * @param {[number, nuber]} start start coordinate [x, y]
 * @param {(x, y) => any} visit called for each node visited
 */
module.exports = (rows, cols, start, visit) => {

  const visited = []
  for(let i = 0; i < rows; i++) {
    visited.push([])
  }

  // visited neighbours of x,y
  const visitedNeighbours = (x,y) => [
    visited[y+1][x],
    visited[y-1][x],
    visited[y][x+1],
    visited[y][x-1]
  ].filter(Boolean).length

  const stack = [start]

  while(stack.length) {
    let [x, y] = stack.pop()
    if(x < 1 || y < 1 || y >= (rows - 1) || x >= (cols - 1)) {
      continue
    }
    if(visited[y][x]) {
      continue
    }
    if(visitedNeighbours(x,y) > 1) {
      // only one neighbour should be visited; the node previously visited
      continue
    }
    if([
      [+1,+1],
      [+1,-1],
      [-1,-1],
      [-1,+1]
    ].some(
      ([dx,dy]) =>
        visited[y+dy] &&
        visited[y+dy][x+dx] &&
        !visited[y][x+dx] &&
        !visited[y+dy][x]
    )) {
      // Check diagonal nodes. I don't want them unless they're connected from
      // the previous node.
      continue
    }

    visited[y][x] = true
    visit(x,y)

    // Add neighbours in random order
    stack.push.apply(stack, shuffle([
      [x+1, y],
      [x-1, y],
      [x, y+1],
      [x, y-1],
    ]))
  }
}
