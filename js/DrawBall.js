function DrawBall (c, x, y, radius, color, feature) {

    var pi = Math.PI

    c.beginPath()
    c.arc(x, y, radius, 0, pi * 2)
    c.fillStyle = color
    c.fill()

    if (feature !== null) feature.paint(c, x, y, radius)

    var reflectionRadius = radius * 0.64

    c.beginPath()
    c.moveTo(x, y - reflectionRadius)
    c.arc(x, y, reflectionRadius, -pi * 0.5, -pi * 0.25)
    c.strokeStyle = 'white'
    c.lineWidth = radius * 0.2
    c.stroke()

}
