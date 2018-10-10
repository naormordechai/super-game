'use strict'

var board = buildBoard()
var gLevel = ''
drawBoard()
let gGamerPos;


function chooseSelect(ev) {
    gLevel = ev.target.value
    board = buildBoard()
    drawBoard()
}


function buildBoard() {
    const board = [];
    for (let i = 0; i < 5; i++) {
        board[i] = []
        for (let j = 0; j < 5; j++) {
            board[i][j] = { isCatch: false, isBlock: false }
        }
    }
    if (gLevel === 'level1') {
        document.querySelector('.victory').innerText = ''
        level1(board)
    }
    else if (gLevel === 'level2') {
        document.querySelector('.victory').innerText = ''
        level2(board)
    }
    else return []
    return board
}

function level1(board) {
    board[1][3].isBlock = true
    board[2][1].isBlock = true
    board[3][4].isBlock = true
    board[4][0].isBlock = true
}

function level2(board) {
    board[0][4].isBlock = true
    board[2][3].isBlock = true
    board[3][0].isBlock = true
    board[4][0].isBlock = true
    board[4][2].isBlock = true
}

function drawBoard() {
    var strHtml = ''
    if (board) {
        board.forEach((_, i) => {
            strHtml += "<tr>"
            board[i].forEach((_, j) => {
                var cellClass;
                if (board[i][j].isBlock) cellClass = 'black'
                strHtml += `<td onclick="handlerClick(${i}, ${j})" class='cell cell-${i}-${j} ${cellClass}'></td>`
            });
            strHtml += "</tr>"
        });
        document.querySelector('.tbl').innerHTML = strHtml
    }
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
                            if (!board[i][j].isCatch && !board[i][j].isBlock) {
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
                            if (!board[i][j].isCatch && !board[i][j].isBlock) {
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
                            if (!board[i][j].isCatch && !board[i][j].isBlock) {
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
                            if (!board[i][j].isCatch && !board[i][j].isBlock) {
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
    var isVictory = true
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (!board[i][j].isCatch && !board[i][j].isBlock) {
                isVictory = false
                return
            }
        }
    }
    if (isVictory) {
        document.querySelector('.victory').innerText = 'well done'
        gGamerPos = null
    }
}

function reset() {
    board.forEach((_, i) => {
        board[i].forEach((_, j) => {
            board[i][j].isCatch = false
        });
    });
    gGamerPos = null
    document.querySelector('.victory').innerText = ''
    drawBoard()
}