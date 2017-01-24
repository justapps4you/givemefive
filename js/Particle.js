function Particle (x, y, color) {

    var pi = Math.PI

    var multiplier = 0.008
    var randomAngle = Math.random() * pi * 2
    x += Math.cos(randomAngle) * multiplier
    y += Math.sin(randomAngle) * multiplier

    var multiplier = 0.5
    var randomAngle = Math.random() * pi * 2
    var distanceX = Math.cos(randomAngle) * multiplier,
        distanceY = Math.sin(randomAngle) * multiplier

    var speedY = -Math.random() * 0.04

    return {
        paint: function (c, ratio, cellSize) {
            c.beginPath()
            c.arc(x * cellSize + cellSize * distanceX * ratio, y * cellSize + cellSize * distanceY * ratio, cellSize * 0.2 * (1 - ratio), 0, pi * 2)
            c.fillStyle = color
            c.fill()
            y += speedY
        },
    }

}
