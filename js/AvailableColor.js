function AvailableColor () {

    var colors = [{
        name: 'blue',
        value: '#2547f4', // 'hsl(230, 90%, 55%)',
    }, {
        name: 'cyan',
        value: '#17cfcf', // 'hsl(180, 80%, 45%)',
    }, {
        name: 'green',
        value: '#36cf17', // 'hsl(110, 80%, 45%)',
    }, {
        name: 'violet',
        value: '#ab30e8', // 'hsl(280, 80%, 55%)',
    }, {
        name: 'red',
        value: '#e83030', // 'hsl(0, 80%, 55%)',
    }]

    return {
        getByName: function (name) {
            return colors.filter(function (color) {
                return color.name === name
            })[0]
        },
        getRandom: function () {
            return colors[Math.floor(Math.random() * colors.length)]
        },
    }

}
