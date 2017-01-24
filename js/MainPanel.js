function MainPanel () {

    function addEmptySlot (x, y) {
        emptySlots.push(EmptySlot(x, y))
    }

    function addNextBall (x, y, color, feature) {
        nextBalls.push(NextBall(x, y, color, feature, boardSize, numberOfBalls))
    }

    function addSteadyBall (x, y, color, feature) {
        steadyBalls.push(SteadyBall(x, y, color, feature, boardSize, numberOfBalls))
    }

    function deselect () {
        addSteadyBall(selectedBall.x, selectedBall.y, selectedBall.color, selectedBall.feature)
        selectedBall = null
    }

    function initEmptySlots () {
        for (var y = 0; y < numberOfBalls; y++) {
            for (var x = 0; x < numberOfBalls; x++) {
                addEmptySlot(x, y)
            }
        }
    }

    function nextStep () {

        shuffle(emptySlots)

        var numBalls = 0

        while (nextBalls.length) {
            var nextBall = nextBalls.shift()
            addSteadyBall(nextBall.x, nextBall.y, nextBall.color, nextBall.feature)
            numBalls++
        }

        while (numBalls < 3) {

            var emptySlot = emptySlots.shift()
            if (!emptySlot) break

            addSteadyBall(emptySlot.x, emptySlot.y, availableColor.getRandom(), availableFeature.getRandom())
            numBalls++

        }

        if (!emptySlots.length) {
            explodingAllBalls = ExplodingAllBalls(steadyBalls.slice(0), boardSize, numberOfBalls)
            steadyBalls.splice(0)
            initEmptySlots()
        }

        for (var i = 0; i < 3; i++) {

            var emptySlot = emptySlots.shift()
            if (!emptySlot) break

            addNextBall(emptySlot.x, emptySlot.y, availableColor.getRandom(), availableFeature.getRandom())

        }

        saveState()

    }

    function paint () {
        if (animationFrame !== null) return
        var startTime = Date.now()
        animationFrame = requestAnimationFrame(function () {

            animationFrame = null
            if (innerWidth !== lastInnerWidth || innerHeight !== lastInnerHeight) resize()
            c.fillStyle = 'rgba(0, 0, 0, 0.8)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            c.save()
            c.translate(halfCanvasWidth, halfCanvasHeight)
            paintBoard()
            c.restore()
            score.paint(c)
            pauseButton.paint(c)

            var elapsed = Date.now() - startTime
            if (elapsed > 20) paint()
            else setTimeout(paint, 20 - elapsed)

        })
    }

    function paintBoard () {

        c.lineCap = 'round'

        board.paint(c)

        for (var i = 0; i < steadyBalls.length; i++) {
            steadyBalls[i].paint(c)
        }

        for (var i = 0; i < nextBalls.length; i++) {
            nextBalls[i].paint(c)
        }

        if (selectedBall !== null) selectedBall.paint(c)
        if (movingBall !== null) {
            if (!movingBall.paint(c)) {

                var matchBalls = MatchBalls(movingBall, steadyBalls, numberOfBalls)
                if (matchBalls === null) {

                    for (var i = 0; i < nextBalls.length; i++) {
                        var nextBall = nextBalls[i]
                        if (nextBall.x === movingBall.x && nextBall.y === movingBall.y) {
                            nextBalls.splice(i, 1)
                            break
                        }
                    }

                    for (var i = 0; i < emptySlots.length; i++) {
                        var emptySlot = emptySlots[i]
                        if (emptySlot.x === movingBall.x && emptySlot.y === movingBall.y) {
                            emptySlots.splice(i, 1)
                            break
                        }
                    }

                    addSteadyBall(movingBall.x, movingBall.y, movingBall.color, movingBall.feature)

                    score.add(1)
                    nextStep()

                } else {

                    for (var i = 0; i < matchBalls.length; i++) {
                        var matchBall = matchBalls[i]
                        steadyBalls.splice(steadyBalls.indexOf(matchBall), 1)
                        addEmptySlot(matchBall.x, matchBall.y)
                    }

                    var affectedBalls = AffectedBalls(movingBall, matchBalls, steadyBalls)
                    explodingBalls = ExplodingBalls(movingBall, affectedBalls, matchBalls, boardSize, numberOfBalls)


                }

                movingBall = null

            }
        }
        if (explodingBalls !== null) {
            if (!explodingBalls.paint(c)) {

                var balls = explodingBalls.balls
                balls.push(explodingBalls.movingBall)

                var affectedBalls = explodingBalls.affectedBalls
                for (var i = 0; i < affectedBalls.length; i++) {
                    var affectedBall = affectedBalls[i]
                    steadyBalls.splice(steadyBalls.indexOf(affectedBall), 1)
                    addEmptySlot(affectedBall.x, affectedBall.y)
                    balls.push(affectedBall)
                }

                score.add(balls.length)
                explodedBalls = ExplodedBalls(balls, boardSize, numberOfBalls)
                explodingBalls = null
                saveState()

            }
        }
        if (markedSlots !== null) markedSlots.paint(c)

        if (explodedBalls !== null) {
            if (!explodedBalls.paint(c)) explodedBalls = null
        }

        if (explodingAllBalls !== null) {
            if (!explodingAllBalls.paint(c)) {
                explodedBalls = ExplodedBalls(explodingAllBalls.balls, boardSize, numberOfBalls)
                nextStep()
                explodingAllBalls = null
                score.reset()
                saveState()
            }
        }

    }

    function resize () {

        canvasWidth = innerWidth * devicePixelRatio
        canvasHeight = innerHeight * devicePixelRatio

        halfCanvasWidth = canvasWidth / 2
        halfCanvasHeight = canvasHeight / 2

        canvas.width = Math.floor(canvasWidth)
        canvas.height = Math.floor(canvasHeight)

        boardSize = Math.min(canvasWidth, canvasHeight) * 0.95

        var ratio = canvasWidth / canvasHeight
        if (ratio < 1) ratio = 1 / ratio
        if (ratio < 1.07) boardSize *= 0.95
        if (ratio < 1.12) boardSize *= 0.95
        if (ratio < 1.17) boardSize *= 0.95
        if (ratio < 1.22) boardSize *= 0.95

        halfBoardSize = boardSize / 2

        cellSize = boardSize / numberOfBalls

        score.resize(canvasWidth, canvasHeight, cellSize)
        board.resize(boardSize)
        pauseButton.resize(canvasWidth, boardSize)
        availableFeature.resize(boardSize)

        for (var i = 0; i < steadyBalls.length; i++) {
            steadyBalls[i].resize(boardSize)
        }

        for (var i = 0; i < nextBalls.length; i++) {
            nextBalls[i].resize(boardSize)
        }

        if (selectedBall !== null) selectedBall.resize(boardSize)
        if (movingBall !== null) movingBall.resize(boardSize)
        if (explodingAllBalls !== null) explodingAllBalls.resize(boardSize)
        if (explodingBalls !== null) explodingBalls.resize(boardSize)
        if (explodedBalls !== null) explodedBalls.resize(boardSize)
        if (markedSlots !== null) markedSlots.resize(boardSize)

        canvas.style.top = -halfCanvasHeight + 'px'
        canvas.style.left = -halfCanvasWidth + 'px'
        canvas.style.transform = 'scale(' + (1 / devicePixelRatio) + ')'

        lastInnerWidth = innerWidth
        lastInnerHeight = innerHeight

    }

    function saveState () {
        localStorage.state = JSON.stringify({
            score: score.get(),
            steadyBalls: steadyBalls.map(toStorageBall),
            nextBalls: nextBalls.map(toStorageBall),
        })
    }

    function selectBall (x, y, color, feature) {
        selectedBall = SelectedBall(x, y, color, feature, boardSize, numberOfBalls)
        markedSlots = MarkedSlots(selectedBall, steadyBalls, boardSize, numberOfBalls)
    }

    function shuffle (array) {
        for (var i = 0; i < array.length; i++) {
            var randomIndex = i + Math.floor(Math.random() * (array.length - i))
            var value = array[i]
            array[i] = array[randomIndex]
            array[randomIndex] = value
        }
    }

    function tap (e) {

        if (movingBall !== null || explodingAllBalls !== null || explodingBalls !== null) return

        if (e.clientX * devicePixelRatio > canvasWidth - cellSize &&
            e.clientY * devicePixelRatio < cellSize) {

            if (selectedBall !== null) {
                deselect()
                markedSlots = null
            }

            explodingAllBalls = ExplodingAllBalls(steadyBalls.slice(0), boardSize, numberOfBalls)
            while (steadyBalls.length) {
                var ball = steadyBalls.pop()
                addEmptySlot(ball.x, ball.y)
            }
            return

        }

        var x = Math.floor((e.clientX * devicePixelRatio - halfCanvasWidth + halfBoardSize) / cellSize),
            y = Math.floor((e.clientY * devicePixelRatio - halfCanvasHeight + halfBoardSize) / cellSize)

        if (x < 0 || y < 0 || x > numberOfBalls - 1 || y > numberOfBalls - 1) return

        if (selectedBall === null) {
            for (var i = 0; i < steadyBalls.length; i++) {
                var steadyBall = steadyBalls[i]
                if (steadyBall.x === x && steadyBall.y === y) {

                    var feature = steadyBall.feature
                    if (feature && feature.isLocked) return

                    steadyBalls.splice(i, 1)
                    selectBall(x, y, steadyBall.color, steadyBall.feature)
                    return

                }
            }
        } else {

            if (x === selectedBall.x && y === selectedBall.y) {
                deselect()
                markedSlots = null
                return
            }

            for (var i = 0; i < steadyBalls.length; i++) {
                var steadyBall = steadyBalls[i]
                if (steadyBall.x === x && steadyBall.y === y) {

                    var feature = steadyBall.feature
                    if (feature && feature.isLocked) return

                    deselect()
                    steadyBalls.splice(i, 1)
                    selectBall(x, y, steadyBall.color, steadyBall.feature)
                    return

                }
            }

            var path = GetPath(selectedBall.x, selectedBall.y, x, y, steadyBalls, numberOfBalls)
            if (path) {
                addEmptySlot(selectedBall.x, selectedBall.y)
                movingBall = MovingBall(selectedBall.x, selectedBall.y, x, y, selectedBall.color, selectedBall.feature, path, boardSize, numberOfBalls)
                selectedBall = null
                markedSlots = null
            }

        }

    }

    function toStorageBall (ball) {
        var storageBall = {
            x: ball.x,
            y: ball.y,
            color: ball.color.name,
        }
        if (ball.feature) storageBall.feature = ball.feature.name
        return storageBall
    }

    var score = Score()

    var numberOfBalls = 8

    var lastInnerWidth = null,
        lastInnerHeight = null

    var canvasWidth,
        canvasHeight

    var halfCanvasWidth,
        halfCanvasHeight

    var pauseButton = PauseButton(canvasWidth, boardSize, numberOfBalls)

    var board = Board(boardSize, numberOfBalls)

    var requestAnimationFrame = window.requestAnimationFrame
    if (!requestAnimationFrame) {
        requestAnimationFrame = window.mozRequestAnimationFrame
    }
    if (!requestAnimationFrame) {
        requestAnimationFrame = function (callback) {
            return setTimeout(callback, 0)
        }
    }

    var availableColor = AvailableColor()
    var availableFeature = AvailableFeature(boardSize, numberOfBalls)

    var animationFrame = null

    var emptySlots = []

    var steadyBalls = []
    var nextBalls = []
    var selectedBall = null
    var movingBall = null
    var explodingAllBalls = null
    var explodingBalls = null
    var explodedBalls = null
    var markedSlots = null

    window.steadyBalls = steadyBalls
    window.nextBalls = nextBalls
    window.emptySlots = emptySlots

    var classPrefix = 'MainPanel'

    var touched = false

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.addEventListener('mousedown', function (e) {

        if (e.button !== 0) return

        if (touched) {
            touched = false
            return
        }

        tap(e)

    })
    canvas.addEventListener('touchstart', function (e) {
        touched = true
        tap(e.changedTouches[0])
    })

    var c = canvas.getContext('2d')

    var centerElement = document.createElement('div')
    centerElement.className = classPrefix + '-center'
    centerElement.appendChild(canvas)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(centerElement)

    var boardSize,
        halfBoardSize

    var cellSize

    return {
        element: element,
        init: function () {
            var state = localStorage.state
            if (state) {

                var data = JSON.parse(state)
                score.set(data.score)

                data.steadyBalls.forEach(function (ball) {
                    var feature = availableFeature.getByName(ball.feature)
                    var color = availableColor.getByName(ball.color)
                    addSteadyBall(ball.x, ball.y, color, feature)
                })

                data.nextBalls.forEach(function (ball) {
                    var feature = availableFeature.getByName(ball.feature)
                    var color = availableColor.getByName(ball.color)
                    addNextBall(ball.x, ball.y, color, feature)
                })

                for (var y = 0; y < numberOfBalls; y++) {
                    for (var x = 0; x < numberOfBalls; x++) {

                        var empty = true

                        for (var i = 0; i < steadyBalls.length; i++) {
                            var steadyBall = steadyBalls[i]
                            if (steadyBall.x === x && steadyBall.y === y) {
                                empty = false
                                break
                            }
                        }

                        if (!empty) continue

                        for (var i = 0; i < nextBalls.length; i++) {
                            var nextBall = nextBalls[i]
                            if (nextBall.x === x && nextBall.y === y) {
                                empty = false
                                break
                            }
                        }

                        if (empty) addEmptySlot(x, y)
                    }
                }

            } else {
                initEmptySlots()
                nextStep()
            }
            paint()
        },
    }

}
