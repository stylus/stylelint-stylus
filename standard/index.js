"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    extends: [require.resolve("../recommended")],
    rules: {
        "stylus/declaration-colon": ["never"],
        "stylus/pythonic": ["always"],
        "stylus/selector-list-comma": ["never"],
        "stylus/semicolon": ["never"],
    },
}
