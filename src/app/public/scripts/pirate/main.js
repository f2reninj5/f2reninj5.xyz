
let cellList = []

window.onbeforeunload = function () {

    localStorage.setItem('board', $('#board').html())
    localStorage.setItem('players', $('#player-list').html())
    localStorage.setItem('choose-queue', $('#choose-queue').val())
    localStorage.setItem('cell-list', cellList)
}

window.onload = function () {

    if (localStorage.getItem('board') == null || localStorage.getItem('cell-list') == null) { return }

    $('#board').html(localStorage.getItem('board'))
    $('#player-list').html(localStorage.getItem('players'))
    $('#choose-queue').val(localStorage.getItem('choose-queue'))
    cellList = localStorage.getItem('cell-list').split(',')
    updateCellList()
}

function wait(time) {

    return new Promise(resolve => setTimeout(resolve, time))
}

async function glanceCells() {

    let cells = $('.cell:not(.occupied)')

    for (let i = 0; i < 10; i++) {

        let cell = $(cells[Math.floor(Math.random() * cells.length)])

        cell.addClass('glance')
        await wait(1000 * 0.2)
        cell.removeClass('glance')
    }
}

function updateCellList() {

    $('#cell-list').text(cellList.join(' '))
}

function occupyCell(cell) {

    cell.addClass('occupied')
    cellList.push(cell.attr('id'))
    updateCellList()
}

function freeCell(cell) {

    cell.removeClass('occupied')
    cellList = cellList.filter(cellId => cellId != cell.attr('id'))
    updateCellList()
}

function clearCells() {

    let cells = $('.occupied')

    for (let cell of cells) {

        $(cell).removeClass('occupied')
    }

    cellList = []
    updateCellList()
}

function clearPlayers() {

    $('#player-list').html('')
}

$('#board').on('click', '.cell, .occupied', function () {

    let cell = $(this)

    if (cell.hasClass('occupied')) {

        freeCell(cell)

    } else {

        occupyCell(cell)
    }
})

$('#random-cell').on('click', async function () {

    await glanceCells()

    let cells = $('.cell:not(.occupied)')
    let cell = $(cells[Math.floor(Math.random() * cells.length)])

    occupyCell(cell)
})

$('#clear-board').on('click', function () {

    clearCells()
})

$('#glance').on('click', function () {

    glanceCells()
})

////////////////////////////////

$('#add-player').on('click', function () {

    let playerInput = $('#player-input')

    if (!playerInput.val()) { return }

    $('#player-list').append(`<div class="player"><p>${playerInput.val()}</p><button class="delete-player">x</button></div>`)

    playerInput.val('')
})

$('#player-input').on('keypress', function (event) {

    if (event.key !== 'Enter') { return }

    if (!$(this).val()) { return }

    $('#player-list').append(`<div class="player"><p>${$(this).val()}</p><button class="delete-player">x</button></div>`)

    $(this).val('')
})

$('#player-list').on('click', '.player .delete-player', function () {

    $(this).parent().remove()
})

$('#randomise-player-list').on('click', function () {

    let playerList = $('#player-list')

    let players = playerList.html().split(/(?<=<\/div>)/g)
    let n = players.length
    let shuffledPlayers = []

    for (let i = 0; i < n; i++) {

        let index = Math.floor(Math.random() * players.length)

        shuffledPlayers.push(players.splice(index, 1))
    }

    $('#player-list').html(shuffledPlayers.join(''))
})

$('#clear-players').on('click', function () {

    clearPlayers()
})
