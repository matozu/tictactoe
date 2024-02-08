let ai = 'X'
let human = 'O'

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity
  let move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (boardArray[i][j] == '') {
        boardArray[i][j] = ai
        let score = minimax(boardArray, 0, false)
        boardArray[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
        } 
      }
    }
  }
  boardArray[move.i][move.j] = ai
  cellElements[move.j*3+move.i].classList.add(X_CLASS)
  cellElements[move.j*3+move.i].removeEventListener('click', handleClick)
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
}

function minimax(boardArray, depth, isMaximizing) {
  let result = checkWinner()
  if (result !== null) {
    return scores[result]
  }

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (boardArray[i][j] == '') {
          boardArray[i][j] = ai
          let score = minimax(boardArray, depth + 1, false)
          boardArray[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (boardArray[i][j] == '') {
          boardArray[i][j] = human
          let score = minimax(boardArray, depth + 1, true)
          boardArray[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}

function checkWinner() {
  let winner = null

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(boardArray[i][0], boardArray[i][1], boardArray[i][2])) {
      winner = boardArray[i][0]
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(boardArray[0][i], boardArray[1][i], boardArray[2][i])) {
      winner = boardArray[0][i]
    }
  }

  // Diagonal
  if (equals3(boardArray[0][0], boardArray[1][1], boardArray[2][2])) {
    winner = boardArray[0][0]
  }
  if (equals3(boardArray[2][0], boardArray[1][1], boardArray[0][2])) {
    winner = boardArray[2][0]
  }

  let openSpots = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boardArray[i][j] == '') {
        openSpots++
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie'
  } else {
    return winner
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != ''
}