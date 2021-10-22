"use strict"

module.exports = {
    extends: ["stylelint-plugin-stylus/base-config"],
    rules: {
        "stylus/hash-object-property-comma": ["never", { "trailing": "always" }],
    },
}
