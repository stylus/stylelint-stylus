"use strict"

module.exports = {
    getLang,
    inCssLiteral,
}

function getLang(node) {
    return getRoot(node).source.lang
}

function getRoot(node) {
    let target = node
    while (target.parent) {
        target = target.parent
    }
    return target
}

function inCssLiteral(node) {
    let cssLiteral = false
    let target = node
    cssLiteral = cssLiteral || isCssLiteral(target)
    while (target.parent) {
        target = target.parent
        cssLiteral = cssLiteral || isCssLiteral(target)
    }
    return cssLiteral && target.source.lang === "stylus"
}

function isCssLiteral(node) {
    return node.type === "atrule" && node.name === "css" && node.cssLiteral
}
