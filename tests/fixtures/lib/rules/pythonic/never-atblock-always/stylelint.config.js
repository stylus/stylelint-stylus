"use strict"

module.exports = {
    extends: ["stylelint-stylus/base-config"],
    rules: {
        "stylus/pythonic": ["never", { "atblock": "always" }],
    },
}
