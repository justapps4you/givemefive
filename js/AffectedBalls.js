function AffectedBalls (movingBall, matchBalls, steadyBalls) {

    function include (x, y) {

        for (var i = 0; i < explodingBalls.length; i++) {
            var explodingBall = explodingBalls[i]
            if (explodingBall.x === x && explodingBall.y === y) return
        }

        var key = x + '-' + y
        if (checked[key]) return

        checked[key] = true

        for (var i = 0; i < steadyBalls.length; i++) {
            var steadyBall = steadyBalls[i]
            if (steadyBall.x === x && steadyBall.y === y) {
                affectedBalls.push(steadyBall)
                explodingBalls.push(steadyBall)
                return
            }
        }

    }

    var explodingBalls = matchBalls.slice(0)
    explodingBalls.push(movingBall)

    var checked = {}

    var affectedBalls = []

    while (explodingBalls.length > 0) {
        var explodingBall = explodingBalls.shift()
        var feature = explodingBall.feature
        if (feature && feature.isExplosive) {

            var x = explodingBall.x,
                y = explodingBall.y

            include(x - 1, y - 1)
            include(x - 1, y)
            include(x - 1, y + 1)
            include(x, y - 1)
            include(x, y)
            include(x, y + 1)
            include(x + 1, y - 1)
            include(x + 1, y)
            include(x + 1, y + 1)

        }
    }

    return affectedBalls

}
