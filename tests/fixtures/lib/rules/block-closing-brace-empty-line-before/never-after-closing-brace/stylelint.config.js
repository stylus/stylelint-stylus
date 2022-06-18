"use strict"

module.exports = {
    extends: ["stylelint-stylus/base-config"],
    rules: {
        "stylus/block-closing-brace-empty-line-before": ["never", {except: ['after-closing-brace']}],
    },
}
