function ExplodedBalls (balls, boardSize, numberOfBalls) {

    function update () {
        cellSize = boardSize / numberOfBalls
        radius = (cellSize / 2) * 0.68
        offset = -boardSize / 2 + cellSize / 2
    }

    var offsetTime = Date.now()

    var cellSize, radius, offset

    var particles = []
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i]
        for (var j = 0; j < 4; j++) {
            particles.push(Particle(ball.x, ball.y, ball.color.value))
        }
    }

    update()

    return {
        paint: function (c) {

            var ratio = (Date.now() - offsetTime) / 500
            if (ratio > 1) return false

            c.save()
            c.translate(offset, offset)

            for (var i = 0; i < particles.length; i++) {
                particles[i].paint(c, ratio, cellSize)
            }

            c.restore()

            return true

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
