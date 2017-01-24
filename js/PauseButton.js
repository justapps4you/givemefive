function PauseButton (canvasWidth, boardSize, numberOfBalls) {

    function update () {
        cellSize = boardSize / numberOfBalls
        width = cellSize * 0.12
        height = cellSize * 0.4
        visualX = canvasWidth - width * 3.2 - cellSize * 0.25
        visualY = cellSize * 0.25
    }

    var cellSize, width, height, visualX, visualY

    update()

    return {
        paint: function (c) {
            c.save()
            c.strokeStyle = '#808080'
            c.beginPath()
            c.translate(canvasWidth - cellSize * 0.5, cellSize * 0.5)
            c.arc(0, 0, cellSize * 0.2, -Math.PI, Math.PI * 0.25)
            c.moveTo(-cellSize * 0.26, -cellSize * 0.2)
            c.lineTo(-cellSize * 0.26, 0)
            c.lineTo(-cellSize * 0.06, 0)
            c.lineWidth = cellSize * 0.08
            c.stroke()
            c.restore()
        },
        resize: function (_canvasWidth, _boardSize) {
            canvasWidth = _canvasWidth
            boardSize = _boardSize
            update()
        },
    }

}
