"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    extends: [require.resolve("../recommended")],
    rules: {
        "stylus/declaration-colon": "never",
        "stylus/media-feature-colon": "never",
        "stylus/single-line-comment-double-slash-space-after": "always",
        "stylus/pythonic": "always",
        "stylus/selector-list-comma": "never",
        "stylus/semicolon": "never",
        "stylus/single-line-comment": "always",
        "stylus/at-extend-style": "@extend",
        "stylus/hash-object-property-comma": ["always", { trailing: "never" }],
        "stylus/no-at-require": true,

        // wrapper core rules
        "stylus/indentation": 2,
        // The "indentation" rule is not turned off with "recommended", but is turned off with "standard".
        // Because the problem with "indentation" rule is only `postfix` problem, and the effect of the problem is small.
        indentation: null,
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
        "stylus/at-rule-empty-line-before": [
            "always",
            {
                except: ["blockless-after-same-name-blockless", "first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "stylus/at-rule-name-space-after": "always-single-line",
        // - number
        "stylus/number-leading-zero": "always",
        "stylus/number-no-trailing-zeros": true,

        // - wrong autofix
        "stylus/color-hex-case": "lower",
        "stylus/selector-pseudo-class-case": "lower",

        // - error remains with autofix
        "stylus/no-eol-whitespace": true,
        // The "no-eol-whitespace" rule is not turned off with "recommended", but is turned off with "standard".
        // Because the problem with "no-eol-whitespace" rule is only location and autofix problem, and the effect of the problem is small.
        "no-eol-whitespace": null,
    },
}
