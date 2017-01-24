function Locked (boardSize, numberOfBalls) {

    function update () {
        cellSize = boardSize / numberOfBalls
        lockWidth = cellSize * 0.38
        lockHeight = cellSize * 0.24
        lockY = -cellSize * 0.02
        ringRadius = cellSize * 0.12
        ringY = lockY - cellSize * 0.11
        lineWidth = cellSize * 0.05
    }

    var cellSize, lockWidth, lockHeight, lockY, ringRadius, ringY, lineWidth

    update()

    return {
        name: 'locked',
        isLocked: true,
        paint: function (c, x, y, radius) {

            c.save()
            c.translate(x, y)

            var scale = radius / (cellSize * 0.32)

            c.beginPath()
            c.lineCap = 'butt'
            c.moveTo(-ringRadius * scale, lockY * scale)
            c.lineTo(-ringRadius * scale, ringY * scale)
            c.arc(0, ringY * scale, ringRadius * scale, -Math.PI, 0)
            c.lineTo(ringRadius * scale, lockY * scale)
            c.lineWidth = scale * lineWidth
            c.strokeStyle = 'rgba(255, 255, 255, 0.6)'
            c.stroke()

            c.beginPath()
            c.rect(-lockWidth * scale * 0.5, lockY * scale, lockWidth * scale, lockHeight * scale)
            c.fillStyle = 'rgba(255, 255, 255, 0.6)'
            c.fill()

            c.restore()

        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
