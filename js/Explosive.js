function Explosive (boardSize, numberOfBalls) {

    function update () {
        cellSize = boardSize / numberOfBalls
        bigRadius = cellSize * 0.27
        smallRadius = cellSize * 0.12
        centerRadius = cellSize * 0.07
    }

    var cellSize,
        bigRadius,
        smallRadius,
        centerRadius,
        angle = Math.PI / 3

    update()

    return {
        name: 'explosive',
        isExplosive: true,
        paint: function (c, x, y, radius) {

            c.save()
            c.translate(x, y)

            var scale = radius / (cellSize * 0.32)

            c.beginPath()
            c.lineCap = 'butt'
            for (var i = 0; i < 3; i++) {
                c.moveTo(bigRadius, 0)
                c.arc(0, 0, bigRadius * scale, 0, angle)
                c.lineTo(Math.cos(angle) * smallRadius, Math.sin(angle) * smallRadius)
                c.arc(0, 0, smallRadius * scale, angle, 0, true)
                c.closePath()
                c.rotate(angle * 2)
            }
            c.arc(0, 0, centerRadius * scale, 0, Math.PI * 2)
            c.fillStyle = 'rgba(255, 255, 255, 0.5)'
            c.fill()

            c.restore()

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
