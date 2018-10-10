'use strict'

const board = buildBoard()
drawBoard()
let gGamerPos;

function buildBoard() {
    const board = [];
    for (let i = 0; i < 5; i++) {
        board[i] = []
        for (let j = 0; j < 5; j++) {
            board[i][j] = { isCatch: false }
        }
    }
    board[1][3].isCatch = true
    board[2][1].isCatch = true
    board[3][4].isCatch = true
    board[4][0].isCatch = true
    return board
}

function drawBoard() {
    var strHtml = ''
    board.forEach((_, i) => {
        strHtml += "<tr>"
        board[i].forEach((_, j) => {
            var cellClass;
            if (board[i][j].isCatch) cellClass = 'black'
            strHtml += `<td onclick="handlerClick(${i}, ${j})" class='cell cell-${i}-${j} ${cellClass}'></td>`
        });
        strHtml += "</tr>"
    });
    document.querySelector('.tbl').innerHTML = strHtml
}


function handlerClick(idxClicked, jdxClicked) {
    if (!board[idxClicked][jdxClicked].isCatch) {
        if (!gGamerPos) {
            gGamerPos = { i: idxClicked, j: jdxClicked }
            board[gGamerPos.i][gGamerPos.j].isCatch = true
            document.querySelector(`.cell-${idxClicked}-${jdxClicked}`).classList.add('color-gamer')
        } else {
            if (idxClicked < gGamerPos.i && jdxClicked === gGamerPos.j) {
                for (let i = gGamerPos.i - 1; i >= 0; i--) {
                    for (let j = 0; j < board[0].length; j++) {
                        if (i < gGamerPos.i && j === gGamerPos.j) {
                            if (!board[i][j].isCatch) {
                                gGamerPos.i = i
                                gGamerPos.j = j
                                board[i][j].isCatch = true
                                document.querySelector(`.cell-${i}-${j}`).classList.add('color-gamer')
                                if (i === 0) gGamerPos.i = i
                            } else return
                        }
                    }
                }
            } else if (idxClicked > gGamerPos.i && jdxClicked === gGamerPos.j) {
                for (let i = gGamerPos.i + 1; i < board.length; i++) {
                    for (let j = 0; j < board[0].length; j++) {
                        if (i > gGamerPos.i && j === gGamerPos.j) {
                            if (!board[i][j].isCatch) {
                                gGamerPos.i = i
                                gGamerPos.j = j
                                board[i][j].isCatch = true
                                document.querySelector(`.cell-${i}-${j}`).classList.add('color-gamer')
                                if (i === board.length - 1) gGamerPos.i = i
                            } else return
                        }
                    }
                }
            } else if (idxClicked === gGamerPos.i && jdxClicked < gGamerPos.j) {
                for (let i = 0; i < board.length; i++) {
                    for (let j = gGamerPos.j - 1; j >= 0; j--) {
                        if (i === gGamerPos.i && j < gGamerPos.j) {
                            if (!board[i][j].isCatch) {
                                gGamerPos.i = i
                                gGamerPos.j = j
                                board[i][j].isCatch = true
                                document.querySelector(`.cell-${i}-${j}`).classList.add('color-gamer')
                                if (j === 0) gGamerPos.j = j
                            } else return
                        }
                    }
                }
            } else if (idxClicked === gGamerPos.i && jdxClicked > gGamerPos.j) {
                for (let i = 0; i < board.length; i++) {
                    for (let j = gGamerPos.j + 1; j < board[0].length; j++) {
                        if (i === gGamerPos.i && j > gGamerPos.j) {
                            if (!board[i][j].isCatch) {
                                gGamerPos.i = i
                                gGamerPos.j = j
                                board[i][j].isCatch = true
                                document.querySelector(`.cell-${i}-${j}`).classList.add('color-gamer')
                                if (j === board[0].length - 1) gGamerPos.j = j
                            } else return
                        }
                    }
                }
            }
        }
    }
    checkIsVictory()
}

function checkIsVictory() {
    var x = true
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (!board[i][j].isCatch) {
                x = false
                return
            }
        }
    }
    if (x) {
        document.querySelector('.victory').innerText = 'well done'
    }
}

function reset() {
    location.reload()
}