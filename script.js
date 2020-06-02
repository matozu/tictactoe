const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6,]
]
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let cellElementsArray = []
let circleTurnChk = document.getElementById('x-first')
let circleTurn

let scores = {
    X: 10,
    O: -10,
    tie: 0
  }

startGame()

circleTurnChk.addEventListener('change', function() {
    startGame()
})

restartButton.addEventListener('click', startGame)

function startGame() {
    //circleTurn = false
    circleTurn = circleTurnChk.checked
    cellElements.forEach(cell => { 
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) 
    })
    setBoardHoverClass() 
    winningMessageElement.classList.remove('show')
    if(!circleTurn) {
        bestMove()

    }
    
}

function handleClick(e) {
    const cell = e.target
    
    if(circleTurn) {
        
        placeMark(cell, CIRCLE_CLASS)

        if (checkWin(CIRCLE_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
            //debugger
            bestMove()
        }
    } 
 }

 function bestMove() {
     debugger

    cellElementsArray.length = 0
    cellElements.forEach(cell=>cellElementsArray.push(cell.classList[1]))
    let move
    let bestScore = -Infinity

    for(let i=0; i<9; i++) {
        if( cellElementsArray[i] == null ) {
            cellElementsArray[i] = X_CLASS
            let score = minimax(cellElementsArray, 0, false)
            cellElementsArray[i] = null
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }      
    }
    placeMark(cellElements[move], X_CLASS)
    if (checkWin(X_CLASS)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    }
    swapTurns()
    setBoardHoverClass()
  }

  function minimax(board, depth, isMaximizing){
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for(let i=0; i<9; i++) {
          if( cellElementsArray[i] == null ) {
            cellElementsArray[i] = X_CLASS
            let score = minimax(cellElementsArray, depth + 1, false);
            cellElementsArray[i] = null
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
    } else {
      let bestScore = Infinity;
      for(let i=0; i<9; i++) {
          if( cellElementsArray[i] == null ) {
            cellElementsArray[i] = CIRCLE_CLASS
            let score = minimax(cellElementsArray, depth + 1, true);
            cellElementsArray[i] = null
            bestScore = Math.min(score, bestScore);
          }
        }
      return bestScore;
    }
  }


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
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

function checkWinnerArray(c) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElementsArray[index] == c
        })
    })
}

function isDrawArray() {
    return cellElementsArray.every(cell => {
        return cell == X_CLASS || 
        cell == CIRCLE_CLASS
    })
}

function checkWinner() {
    let winner = null
    if(checkWinnerArray(X_CLASS)) {
        winner = 'X'
    } else if(checkWinnerArray(CIRCLE_CLASS)) {
        winner = 'O'
    } else if (isDrawArray()) {
        Winner = 'tie'
    }
    return winner
}