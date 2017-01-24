function SelectedBall (x, y, color, feature, boardSize, numberOfBalls) {

    function update () {

        var cellSize = boardSize / numberOfBalls
        radius = cellSize * 0.34

        var offset = -boardSize / 2 + boardSize / (2 * numberOfBalls)
        visualX = offset + x * cellSize
        visualY = offset + y * cellSize

    }

    var offsetTime = Date.now()

    var radius
    var visualX, visualY

    update()

    return {
        color: color,
        feature: feature,
        x: x,
        y: y,
        paint: function (c) {

            var sin = Math.sin((Date.now() - offsetTime) * 0.008)
            var jumpY = sin
            if (sin < 0) jumpY *= 0.3

            c.save()
            c.translate(visualX, visualY - jumpY * radius * 0.4)
            if (sin < 0) {
                var scale = sin * 0.15
                c.scale(1 - scale, 1 + scale)
            }
            DrawBall(c, 0, 0, radius, color.value, feature)
            c.restore()

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
