"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    extends: [require.resolve("../recommended")],
    rules: {
        "stylus/at-extend-style": ["@extend"],
        "stylus/declaration-colon": ["always"],

        "stylus/hash-object-property-comma": [
            "always",
            {
                trailing: "never",
            },
        ],
        "stylus/indentation": 2,
        // The "indentation" rule is not turned off with "recommended", but is turned off with "standard".
        // Because the problem with "indentation" rule is only `postfix` problem, and the effect of the problem is small.
        indentation: null,
        "stylus/media-feature-colon": ["always"],
        "stylus/no-at-require": [true],
        "stylus/pythonic": [
            "never",
            {
                atblock: "never",
            },
        ],
        "stylus/selector-list-comma": ["always"],
        "stylus/semicolon": ["always"],
        "stylus/single-line-comment": ["never"],
    },
}
