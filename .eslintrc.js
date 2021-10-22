"use strict"

module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
    },
    extends: [
        "plugin:@ota-meshi/recommended",
        "plugin:@ota-meshi/+node",
        "plugin:@ota-meshi/+json",
        "plugin:@ota-meshi/+yaml",
        // "plugin:@ota-meshi/+md",
        "plugin:@ota-meshi/+prettier",
    ],
    plugins: [],
    rules: {
        "require-jsdoc": "off",
        "no-warning-comments": "warn",
        "spaced-comment": ["error", "always", { markers: ["/"] }],
    },
    globals: {
        root: "off",
    },

    overrides: [
        {
            files: ["scripts/*.js"],
            rules: {
                "require-jsdoc": "off",
            },
        },
    ],
}
