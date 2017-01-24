function NextBall (x, y, color, feature, boardSize, numberOfBalls) {

    function update () {

        var cellSize = boardSize / numberOfBalls
        radius = cellSize * 0.14

        var offset = -boardSize / 2 + boardSize / (2 * numberOfBalls)
        visualX = offset + x * cellSize
        visualY = offset + y * cellSize

    }

    var radius
    var visualX, visualY

    update()

    return {
        color: color,
        feature: feature,
        x: x,
        y: y,
        paint: function (c) {
            DrawBall(c, visualX, visualY, radius, color.value, null)
        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
