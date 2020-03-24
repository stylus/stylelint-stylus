"use strict"

module.exports = {
    plugins: ["stylelint-plugin-stylus"],
    rules: {
        "stylus/block-closing-brace-empty-line-before": ["never", {except: ['after-closing-brace']}],
    },
}
