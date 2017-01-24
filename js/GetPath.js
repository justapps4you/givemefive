function GetPath (fromX, fromY, toX, toY, steadyBalls, numberOfBalls) {

    var checked = {}
    var queue = [{
        x: fromX,
        y: fromY,
        fromX: null,
        fromY: null,
    }]

    var path = null
    var pathFound = false

    while (queue.length) {

        var point = queue.shift()

        var x = point.x,
            y = point.y

        if (x < 0 || y < 0 || x > numberOfBalls - 1 || y > numberOfBalls - 1) continue

        var key = x + '-' + y
        if (checked[key]) continue

        checked[key] = {
            x: point.fromX,
            y: point.fromY,
        }

        var found = false
        for (var i = 0; i < steadyBalls.length; i++) {
            var steadyBall = steadyBalls[i]
            if (steadyBall.x === x && steadyBall.y === y) {
                found = true
                break
            }
        }
        if (found) continue

        if (x === toX && y === toY) {
            pathFound = true
            break
        }

        queue.push({
            x: x + 1,
            y: y,
            fromX: x,
            fromY: y,
        })
        queue.push({
            x: x - 1,
            y: y,
            fromX: x,
            fromY: y,
        })
        queue.push({
            x: x,
            y: y + 1,
            fromX: x,
            fromY: y,
        })
        queue.push({
            x: x,
            y: y - 1,
            fromX: x,
            fromY: y,
        })

    }

    if (pathFound) {
        var path = []
        var x = toX, y = toY
        while (true) {

            var point = checked[x + '-' + y]

            if (point.x === null) break

            path.push({ x: x, y: y })

            x = point.x
            y = point.y

        }
        path.push({ x: fromX, y: fromY })
        path = path.reverse()
    }

    return path

}
