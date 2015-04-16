module.exports = {
    rectToPolar: function(x, y) {
        return [
            Math.sqrt(x * x + y * y),
            Math.atan2(x, y)
        ];
    },

    polarToRect: function(r, phi) {
        return [
            r * Math.sin(phi),
            r * Math.cos(phi)
        ];
    }
}