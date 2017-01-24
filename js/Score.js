function Score () {

    function highlightHighest (c) {
        if (highestHighlight > 0) highestHighlight--
        if (highestHighlight > 0) c.fillStyle = highlightFillStyle
    }

    function highlightValue (c) {
        if (valueHighlight > 0) valueHighlight--
        if (valueHighlight > 0) c.fillStyle = highlightFillStyle
    }

    var value = 0

    var valueHighlight = 0
    var highestHighlight = 0
    var maxHighlight = 50
    var highlightFillStyle = '#f7f76e'

    var fontPadding

    var highest = parseInt(localStorage.highScore, 10)
    if (!isFinite(highest)) highest = 0

    var canvasWidth, canvasHeight, cellSize

    return {
        add: function (n) {
            value += n
            valueHighlight = maxHighlight
            if (value > highest) {
                highest = value
                highestHighlight = maxHighlight
                localStorage.highScore = highest
            }
        },
        get: function () {
            return value
        },
        paint: function (c) {

            c.save()

            var smallFontSize = cellSize * 0.26,
                largeFontSize = cellSize * 0.5,
                spacing = cellSize * 0.1

            var smallFont = 'normal ' + smallFontSize + 'px sans-serif',
                largeFont = 'normal ' + cellSize * 0.5 + 'px sans-serif'

            c.fillStyle = '#808080'
            c.textBaseline = 'top'
            if (canvasWidth > canvasHeight) {

                c.save()
                highlightValue(c)
                c.translate(fontPadding, fontPadding)
                c.textAlign = 'right'
                c.rotate(-Math.PI * 0.5)
                c.font = smallFont
                c.fillText('YOUR SCORE', 0, 0)
                c.font = largeFont
                c.fillText(value, 0, smallFontSize + spacing)
                c.restore()

                c.save()
                c.translate(fontPadding, canvasHeight - fontPadding)
                c.textAlign = 'left'
                c.rotate(-Math.PI * 0.5)
                c.font = smallFont
                highlightHighest(c)
                c.fillText('HIGH SCORE', 0, 0)
                c.font = largeFont
                c.fillText(highest, 0, smallFontSize + spacing)
                c.restore()

            } else {

                c.save()
                highlightValue(c)
                c.font = smallFont
                c.fillText('YOUR SCORE', fontPadding, fontPadding)
                c.font = largeFont
                c.fillText(value, fontPadding, fontPadding + smallFontSize + spacing)
                c.restore()

                c.save()
                highlightHighest(c)
                c.font = smallFont
                c.fillText('HIGH SCORE', fontPadding, canvasHeight - fontPadding - largeFontSize - spacing - smallFontSize)
                c.font = largeFont
                c.fillText(highest, fontPadding, canvasHeight - fontPadding - largeFontSize)
                c.restore()

            }

            c.restore()

        },
        reset: function () {
            value = 0
        },
        resize: function (_canvasWidth, _canvasHeight, _cellSize) {
            canvasWidth = _canvasWidth
            canvasHeight = _canvasHeight
            cellSize = _cellSize
            fontPadding = cellSize * 0.25
        },
        set: function (_value) {
            value = _value
        },
    }

}
