function ExplodingBalls (movingBall, affectedBalls, balls, boardSize, numberOfBalls) {

    function drawBall (c, ball, ballRadius) {
        DrawBall(c, ball.x * cellSize, ball.y * cellSize, ballRadius, ball.color.value, ball.feature)
    }

    function update () {
        cellSize = boardSize / numberOfBalls
        radius = (cellSize / 2) * 0.68
        offset = -boardSize / 2 + cellSize / 2
        wideRadius = radius * 0.3
    }

    var offsetTime = Date.now()

    var cellSize, radius, wideRadius, offset

    update()

    return {
        affectedBalls: affectedBalls,
        balls: balls,
        movingBall: movingBall,
        paint: function (c) {

            var ratio = (Date.now() - offsetTime) / 500
            if (ratio > 1) return false

            c.save()
            c.translate(offset, offset)

            var ballRadius = radius + ratio * wideRadius
            for (var i = 0; i < balls.length; i++) {
                drawBall(c, balls[i], ballRadius)
            }
            drawBall(c, movingBall, ballRadius)

            c.restore()

            return true

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
