"use strict"

module.exports = {
    plugins: ["stylelint-plugin-stylus"],
    rules: {
        "stylus/pythonic": ["always", { "atblock": "never" }],
    },
}
