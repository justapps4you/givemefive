function MovingBall (x, y, toX, toY, color, feature, path, boardSize, numberOfBalls) {

    function update () {
        cellSize = boardSize / numberOfBalls
        offset = -boardSize / 2 + boardSize / (2 * numberOfBalls)
        radius = cellSize * 0.14
    }

    var point = path.shift()

    var index = 0

    var offset,
        cellSize,
        radius

    update()

    return {
        color: color,
        feature: feature,
        x: toX,
        y: toY,
        paint: function (c) {

            index++
            if (index === 2) {
                index = 0
                point = path.shift()
                if (!point) return false
            }

            x = point.x
            y = point.y

            visualX = offset + x * cellSize
            visualY = offset + y * cellSize

            DrawBall(c, visualX, visualY, radius, color.value, null)

            return true

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
