"use strict"

module.exports = {
    getLang,
    inCssLiteral,
}

function getLang(node) {
    return node.root().source.lang
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
    return (
        node.type === "atrule" &&
        node.name.toLowerCase() === "css" &&
        node.cssLiteral
    )
}
