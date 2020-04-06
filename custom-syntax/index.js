"use strict"

const syntax = require("postcss-syntax")

module.exports = syntax({
    stylus: require("postcss-styl"),
    jsx: require("@stylelint/postcss-css-in-js"),
    markdown: require("@stylelint/postcss-markdown"),
})
