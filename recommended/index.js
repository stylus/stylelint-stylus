"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    rules: {
        // wrapper core rules
        "selector-list-comma-newline-after": null,
        "selector-list-comma-newline-before": null,
        "selector-list-comma-space-after": null,
        "selector-list-comma-space-before": null,
        // useless for the stylus
        // "block-opening-brace-space-before": null,
        // "block-closing-brace-newline-before": null,
        // "declaration-block-trailing-semicolon": null,
        // "block-closing-brace-space-before": null,
        // "property-no-unknown": null,
        // "at-rule-no-unknown": null,
        // breaks stylus
        // "at-rule-name-space-after": null,
    },
}
