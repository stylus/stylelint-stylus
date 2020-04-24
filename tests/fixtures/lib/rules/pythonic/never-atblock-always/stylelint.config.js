"use strict"

module.exports = {
    plugins: ["stylelint-plugin-stylus"],
    rules: {
        "stylus/pythonic": ["never", { "atblock": "always" }],
    },
}
