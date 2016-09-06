colorOfTime.service('ColorOfTimeService', [function() {
    var ColorOfTimeService = this;

    ColorOfTimeService.getColor = function(speed) {
        if (typeof speed === 'undefined') {
            speed = 1;
        }

        //Calculate % of day already passed
        var date = new Date();
        var hour = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) / 86400;
        hour = hour * speed % 1;

        //Calculate color value [0-255] based on the time
        var red   = 0;
        var green = 0;
        var blue  = 0;
        if (hour < .17) {
            red   = 1;
            green = hour / .17;
            blue  = 0;
        } else if (hour < .34) {
            red   = 1 - ((hour - .17) / .17);
            green = 1;
            blue  = 0;
        } else if (hour < .51) {
            red   = 0;
            green = 1;
            blue  = (hour - .34) / .17;
        } else if (hour < .68) {
            red   = 0;
            green = 1 - ((hour - .51) / .17);
            blue  = 1;
        } else if (hour < .85) {
            red   = (hour - .68) / .17;
            green = 0;
            blue  = 1;
        } else if (hour <= 1) {
            red   = 1;
            green = 0;
            blue  = 1-((hour - .85) / .15);
        }

        //Convert color value [0-255] to hexadecimal
        red = Math.floor(red * 255).toString(16);
        green = Math.floor(green * 255).toString(16);
        blue = Math.floor(blue * 255).toString(16);
        if (red.length == 1) { red = "0".concat(red); }
        if (green.length == 1) { green = "0".concat(green); }
        if (blue.length == 1) { blue = "0".concat(blue); }

        return "#" + red.concat(green).concat(blue).toUpperCase();
    };
}]);