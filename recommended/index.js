"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    rules: {
        // List of possible errors rules within `stylelint-plugin-stylus`
        "stylus/single-line-comment-no-empty": true,
        // wrapper core rules
        "stylus/at-rule-no-unknown": true,
        "stylus/selector-type-no-unknown": true,
        "stylus/property-no-unknown": true,

        // List of core rules that cannot be used with the Stylus.
        // - The Stylus can also be separated by newlines without using comma separators.
        "selector-list-comma-newline-after": null,
        "selector-list-comma-newline-before": null,
        "selector-list-comma-space-after": null,
        "selector-list-comma-space-before": null,

        // - The Stylus can omit the braces.
        "block-closing-brace-empty-line-before": null,
        "block-closing-brace-newline-after": null,
        "block-closing-brace-newline-before": null,
        "block-closing-brace-space-after": null,
        "block-closing-brace-space-before": null,
        "block-opening-brace-newline-after": null,
        "block-opening-brace-newline-before": null,
        "block-opening-brace-space-after": null,
        "block-opening-brace-space-before": null,

        // - The Stylus can omit the semicolons. And you can use "stylus/semicolon" rules instead.
        "declaration-block-trailing-semicolon": null,

        // - This rule breaks the Stylus syntax.
        "at-rule-name-newline-after": null,
        // - The `postcss-styl` atrule AST contains function calls.
        "at-rule-name-space-after": null,
        // - The `postcss-styl` atrule AST contains if, for and function calls.
        "at-rule-empty-line-before": null,
        // - Don't understand the Stylus at-rules. And the `postcss-styl` atrule AST contains if, for and function calls.
        "at-rule-no-unknown": null,

        // - False positives the Range Operator of the Stylus.
        "number-leading-zero": null,
        "number-no-trailing-zeros": null,
        // - False positives in variables and interpolations of the Stylus.
        "property-no-unknown": null,

        // - Don't understand the Stylus selectors.
        "selector-type-no-unknown": null,

        // - Wrong autofix on the Stylus.
        "color-hex-case": null,
        "selector-pseudo-class-case": null,
    },
}
