function MarkedEdges (selectedBall, slots, boardSize, numberOfBalls) {

    function addEdge (fromX, fromY, toX, toY) {
        edges.push(MarkedEdge(fromX, fromY, toX, toY))
    }

    function isMarked (x, y) {
        for (var i = 0; i < slots.length; i++) {
            var slot = slots[i]
            if (slot.x === x && slot.y === y) return true
        }
        return false
    }

    function update () {
        offset = -boardSize / 2
        cellSize = boardSize / numberOfBalls
    }

    var edges = []

    for (var i = 0; i < slots.length; i++) {

        var slot = slots[i]

        var x = slot.x,
            y = slot.y

        if (!isMarked(x, y - 1)) addEdge(x, y, x + 1, y)
        if (!isMarked(x, y + 1)) addEdge(x, y + 1, x + 1, y + 1)
        if (!isMarked(x - 1, y)) addEdge(x, y, x, y + 1)
        if (!isMarked(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1)

    }

    var offset, cellSize

    update()

    return {
        paint: function (c) {
            c.save()
            c.translate(offset, offset)
            c.beginPath()
            for (var i = 0; i < edges.length; i++) {
                var edge = edges[i]
                c.moveTo(edge.fromX * cellSize, edge.fromY * cellSize)
                c.lineTo(edge.toX * cellSize, edge.toY * cellSize)
            }
            c.lineWidth = boardSize * 0.005
            c.lineCap = 'round'
            c.strokeStyle = selectedBall.color.value
            c.stroke()
            c.restore()
        },
        resize: function (_boardSize) {
            boardSize = _boardSize
            update()
        },
    }

}
