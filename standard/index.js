"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    extends: [require.resolve("../recommended")],
    rules: {
        "stylus/declaration-colon": "never",
        "stylus/single-line-comment-double-slash-space-after": "always",
        "stylus/pythonic": "always",
        "stylus/selector-list-comma": "never",
        "stylus/semicolon": "never",
        "stylus/single-line-comment": "always",

        // wrapper core rules
        // - brace
        "stylus/block-closing-brace-empty-line-before": "never",
        "stylus/block-closing-brace-newline-after": "always",
        "stylus/block-closing-brace-newline-before": "always-multi-line",
        "stylus/block-closing-brace-space-before": "always-single-line",
        "stylus/block-opening-brace-newline-after": "always-multi-line",
        "stylus/block-opening-brace-space-after": "always-single-line",
        "stylus/block-opening-brace-space-before": "always",
        // - selector-list-comma
        "stylus/selector-list-comma-newline-after": "always",
        "stylus/selector-list-comma-space-before": "never",
        // - atrule
        "stylus/at-rule-name-space-after": "always-single-line",
        // - number
        "stylus/number-leading-zero": "always",
        "stylus/number-no-trailing-zeros": true,
    },
}
