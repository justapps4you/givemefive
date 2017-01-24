function MarkedSlots (selectedBall, steadyBalls, boardSize, numberOfBalls) {

    function update () {

        offset = -boardSize / 2
        cellSize = boardSize / numberOfBalls

        canvasSize = Math.ceil(boardSize * 1.01)
        halfCanvasSize = canvasSize / 2
        canvas.width = canvas.height = canvasSize

        var c = canvas.getContext('2d')
        c.translate(halfCanvasSize, halfCanvasSize)

        c.save()
        c.translate(offset, offset)
        c.globalAlpha = 0.2
        c.beginPath()
        for (var i = 0; i < slots.length; i++) {
            var slot = slots[i]
            c.rect(slot.x * cellSize, slot.y * cellSize, cellSize, cellSize)
        }
        c.fillStyle = selectedBall.color.value
        c.fill()
        c.restore()

        edges.paint(c)

    }

    var canvas = document.createElement('canvas')

    var checked = {}
    var queue = [{
        x: selectedBall.x,
        y: selectedBall.y,
    }]

    var slots = []

    while (queue.length) {

        var point = queue.shift()

        var x = point.x,
            y = point.y

        if (x < 0 || y < 0 || x > numberOfBalls - 1 || y > numberOfBalls - 1) continue

        var key = x + '-' + y
        if (checked[key]) continue

        checked[key] = true

        var found = false
        for (var i = 0; i < steadyBalls.length; i++) {
            var steadyBall = steadyBalls[i]
            if (steadyBall.x === x && steadyBall.y === y) {
                found = true
                break
            }
        }
        if (found) continue

        slots.push(MarkedSlot(x, y))

        queue.push({
            x: x + 1,
            y: y,
        })
        queue.push({
            x: x - 1,
            y: y,
        })
        queue.push({
            x: x,
            y: y + 1,
        })
        queue.push({
            x: x,
            y: y - 1,
        })

    }

    var offset, cellSize, canvasSize, halfCanvasSize

    var edges = MarkedEdges(selectedBall, slots, boardSize, numberOfBalls)

    update()

    return {
        paint: function (c) {
            c.drawImage(canvas, -halfCanvasSize, -halfCanvasSize)
        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            edges.resize(boardSize)
            update()
        },
    }

}
