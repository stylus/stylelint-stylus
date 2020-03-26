"use strict"

module.exports = {
    plugins: ["stylelint-plugin-stylus"],
    rules: {
        "stylus/at-rule-no-unknown": [true, {ignoreAtRules: ["/^my-/", "custom"]}],
    },
}
