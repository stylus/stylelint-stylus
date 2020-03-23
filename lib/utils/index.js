"use strict"

module.exports = {
    isSingleLineString,
}

function isSingleLineString(input) {
    return !/[\n\r]/u.test(input)
}
