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
        "@mysticatea/no-use-ignored-vars": ["error", "^_[a-zA-Z]+$"],
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