const isPieceAtPosition = (chessBoard, letter, number) => {
    if (chessBoard[letter][number].piece.type === null) {
        return false
    }
    return true
}

const isLocationWithinBounds = (letter, number) => {
    return ((letter >= 1) && (letter <= 8)) && ((number >= 1) && (number <= 8))
}


const showPossibleMoves = (chessBoard, possibleMovesToShow, setChessBoard) => {
    const newChessBoard = chessBoard
    for (var i = 0; i < possibleMovesToShow.length; i++) {
        const letterIndexToShow = possibleMovesToShow[i][0]
        const numberIndexToShow = possibleMovesToShow[i][1]

        newChessBoard[letterIndexToShow][numberIndexToShow].indicatorMoveHere = true
        console.log(newChessBoard[letterIndexToShow][numberIndexToShow]); 
    }
    return newChessBoard
}

const addPossibleMove = (chessBoard, letter, number, possibleMoves) => {
    if (isLocationWithinBounds(letter, number)) {
        if (!isPieceAtPosition(chessBoard, letter, number)) {
            possibleMoves.push([letter, number])
            return true
        }
    }
    return false
}

const checkDiagonals = (chessBoard, letter, number, possibleMoves) => {
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, letter - i, number + i, possibleMoves)) {
            break
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, letter + i, number + i, possibleMoves)) {
            break
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, letter - i, number - i, possibleMoves)) {
            break
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, letter + i, number - i, possibleMoves)) {
            break
        }
    }
}

const getPossibleMovesKnight = (chessBoard, letter, number) => {
    const possibleMoves = []
    const checkPositions = [
        [letter + 2, number - 1], [letter + 2, number + 1], 
        [letter - 2, number - 1], [letter - 2, number + 1],
        [letter - 1, number - 2], [letter + 1, number - 2],
        [letter - 1, number + 2], [letter + 1, number + 2]
    ]

    for (var i = 0; i < checkPositions.length; i++) {
        if (isLocationWithinBounds(checkPositions[i][0], checkPositions[i][1])) {
            if (!isPieceAtPosition(chessBoard, checkPositions[i][0], checkPositions[i][1])) {
                possibleMoves.push(checkPositions[i])
            }
        }
    }
    return possibleMoves
}

const getPossibleMovesBishop = (chessBoard, letter, number) => {
    const possibleMoves = []

    checkDiagonals(chessBoard, letter, number, possibleMoves)    

    return possibleMoves
}

const getPossibleMovesKing = (chessBoard, letter, number) => {
    const possibleMoves = []
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (isLocationWithinBounds(letter + i, number + j)) {
                if (!isPieceAtPosition(chessBoard, letter + i, number + j)) {
                  possibleMoves.push([letter + i, number + j])
                }
            }
        }
    }
    return possibleMoves 
}

const getPossibleMovesPawn = (chessBoard, letter, number) => {
    const possibleMoves = []
    const chessPiece = chessBoard[letter][number].piece

    if (chessPiece.color === 'l') {
        if (number === 2) {
            if (isLocationWithinBounds(letter, number + 2)) {
                if (!isPieceAtPosition(chessBoard, letter, number + 2)) {
                    possibleMoves.push([letter, number + 2])
                }
            }
        }
        if (isLocationWithinBounds(letter, number + 1)) {
            if (!isPieceAtPosition(chessBoard, letter, number + 1)) {
                possibleMoves.push([letter, number + 1])
            }
        }
    }
    else {
        if (number === 7) {
            if (isLocationWithinBounds(letter, number - 2)) {
                if (!isPieceAtPosition(chessBoard, letter, number - 2)) {
                    possibleMoves.push([letter, number - 2])
                }
            }
        }
        if (isLocationWithinBounds(letter, number - 1)) {
            if (!isPieceAtPosition(chessBoard, letter, number - 1)) {
                possibleMoves.push([letter, number - 1])
            }
        }        
    }

    return possibleMoves 
}

export default {
    showPossibleMoves,
    getPossibleMovesKing,
    getPossibleMovesPawn,
    getPossibleMovesKnight,
    getPossibleMovesBishop
}