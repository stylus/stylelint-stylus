"use strict"

module.exports = {
    parserOptions: {},
    extends: [
        "plugin:@mysticatea/es2015",
        "plugin:@mysticatea/+node",
    ],
    plugins: [],
    rules: {
        'require-jsdoc': 'off',
        "no-warning-comments": "warn",
        "@mysticatea/vue/comma-dangle": 'off',
        "@mysticatea/no-use-ignored-vars": ["error", "^_[a-zA-Z]+$"],
        "spaced-comment": ["error", "always", { "markers": ["/"] }]
    },
    globals:{
        root: "off"
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