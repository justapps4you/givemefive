function Board (boardSize, numberOfBalls) {

    function addLine (c, i) {

        c.moveTo(-halfBoardSize, -halfBoardSize + cellSize * i)
        c.lineTo(halfBoardSize, -halfBoardSize + cellSize * i)

        c.moveTo(-halfBoardSize + cellSize * i, -halfBoardSize)
        c.lineTo(-halfBoardSize + cellSize * i, halfBoardSize)

    }

    function update () {

        cellSize = boardSize / numberOfBalls
        halfBoardSize = boardSize / 2

        canvasSize = Math.ceil(boardSize * 1.01)
        halfCanvasSize = canvasSize / 2
        canvas.width = canvas.height = canvasSize

        var c = canvas.getContext('2d')
        c.translate(halfCanvasSize, halfCanvasSize)

        c.beginPath()
        for (var i = 1; i < numberOfBalls; i++) addLine(c, i)
        c.lineWidth = boardSize * 0.003
        c.strokeStyle = '#333'
        c.stroke()

        c.beginPath()
        addLine(c, 0)
        addLine(c, numberOfBalls)
        c.lineWidth = boardSize * 0.005
        c.strokeStyle = '#666'
        c.stroke()

    }

    var cellSize, halfBoardSize, canvasSize, halfCanvasSize

    var canvas = document.createElement('canvas')

    update()

    return {
        paint: function (c) {
            c.drawImage(canvas, -halfCanvasSize, -halfCanvasSize)
        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
