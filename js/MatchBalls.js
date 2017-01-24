function MatchBalls (movingBall, steadyBalls, numberOfBalls) {

    function match (dx1, dy1, dx2, dy2) {

        function include (dx, dy) {

            var x = movingBall.x,
                y = movingBall.y

            while (true) {

                x += dx
                y += dy

                if (x < 0 || y < 0 || x > numberOfBalls - 1 || y > numberOfBalls - 1) break

                var found = false
                for (var i = 0; i < steadyBalls.length; i++) {
                    var steadyBall = steadyBalls[i]
                    if (steadyBall.x === x && steadyBall.y === y) {
                        if (steadyBall.color === movingBall.color) {
                            matched.push(steadyBall)
                            found = true
                        }
                        break
                    }
                }
                if (!found) break

            }

        }

        var matched = []
        include(dx1, dy1)
        include(dx2, dy2)
        if (matched.length > 3) {
            matchBalls.push.apply(matchBalls, matched)
        }

    }

    var matchBalls = []

    match(-1, 0, 1, 0)
    match(0, -1, 0, 1)
    match(-1, -1, 1, 1)
    match(-1, 1, 1, -1)

    if (matchBalls.length) return matchBalls
    return null

}
