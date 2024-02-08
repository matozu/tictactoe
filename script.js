const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
let currentClass
let boardArray
let circleTurnChk = document.getElementById('x-first')
var audio = document.getElementById('audioHahaha')

startGame()

circleTurnChk.addEventListener('change', function() {
  startGame()
})

restartButton.addEventListener('click', startGame)

function startGame() {
  boardArray = [
    ['','',''],
    ['','',''],
    ['','','']
  ]

  circleTurn = circleTurnChk.checked
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })

  setBoardHoverClass()
  if(!circleTurn) {
    bestMove()
    swapTurns()
  }

  cellElements[5]

  winningMessageElement.classList.remove('show')
}


function handleClick(e) {
  if(circleTurn) {
    const cell = e.target
  currentClass = circleTurn? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  createBoard();

  if(!check(currentClass)){
    swapTurns()
    bestMove()
    check(currentClass)
    swapTurns()
  }

  }
  
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    audio.play()
  }
  winningMessageElement.classList.add('show')
  
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  setBoardHoverClass()
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function check(player){
  if (checkWin(player)) {
    endGame(false)
    return true
  } else if (isDraw()) {
    endGame(true)
    return true
  } else {
    return false
  }
}

function createBoard() {
  for(let i= 0; i<3; i++) {
    for(let j= 0; j<3; j++) {
      if(cellElements[i*3+j].classList.contains(X_CLASS)){
        boardArray[j][i] = 'X'
      } else if(cellElements[i*3+j].classList.contains(CIRCLE_CLASS)){
        boardArray[j][i] = 'O'
      }
    }
  }
}