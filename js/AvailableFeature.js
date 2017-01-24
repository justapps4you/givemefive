function AvailableFeature (boardSize, numberOfBalls) {
    return {
        getByName: function (name) {
            if (name === 'explosive') return Explosive(boardSize, numberOfBalls)
            if (name === 'locked') return Locked(boardSize, numberOfBalls)
            return null
        },
        getRandom: function () {
            var random = Math.random()
            if (random < 0.10) return Explosive(boardSize, numberOfBalls)
            if (random < 0.12) return Locked(boardSize, numberOfBalls)
            return null
        },
        resize: function (_boardSize) {
            boardSize = _boardSize
        },
    }
}
