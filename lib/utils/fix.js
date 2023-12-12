"use strict"
/** @typedef {import('postcss').Declaration} Declaration */

module.exports = {
    addEmptyLineBefore,
    removeEmptyLinesBefore,
    addEmptyLineAfter,
    removeEmptyLinesAfter,
    setDeclarationValue,
}

/**
 * Add an empty line before a node. Mutates the node.
 *
 * @template {import('postcss').ChildNode} T
 * @param {T} node
 * @param {string} newline
 * @returns {T}
 */
function addEmptyLineBefore(node, newline) {
    const { raws } = node

    if (typeof raws.before !== "string") {
        return node
    }

    raws.before = !/\r?\n/.test(raws.before)
        ? newline.repeat(2) + raws.before
        : raws.before.replace(/(\r?\n)/, `${newline}$1`)

    return node
}

/**
 * Remove empty lines before a node. Mutates the node.
 *
 * @template {import('postcss').Node} T
 * @param {T} node
 * @param {string} newline
 * @returns {T}
 */
function removeEmptyLinesBefore(node, newline) {
    node.raws.before = node.raws.before
        ? node.raws.before.replace(/(\r?\n\s*\n)+/g, newline)
        : ""

    return node
}

/**
 * Add an empty line after a node. Mutates the node.
 *
 * @template {import('postcss').Rule | import('postcss').AtRule} T
 * @param {T} node
 * @param {string} newline
 * @returns {T}
 */
function addEmptyLineAfter(node, newline) {
    const { raws } = node

    if (typeof raws.after !== "string") {
        return node
    }

    const spaces = raws.after.split(";")
    const after = spaces[spaces.length - 1] || ""

    if (!/\r?\n/.test(after)) {
        raws.after += newline.repeat(2)
    } else {
        raws.after = raws.after.replace(/(\r?\n)/, `${newline}$1`)
    }

    return node
}

/**
 * Remove empty lines before a node. Mutates the node.
 *
 * @template {import('postcss').Rule | import('postcss').AtRule} T
 * @param {T} node
 * @param {string} newline
 * @returns {T}
 */
function removeEmptyLinesAfter(node, newline) {
    node.raws.after = node.raws.after
        ? node.raws.after.replace(/(\r?\n\s*\n)+/g, newline)
        : ""

    return node
}

/**
 * @param {Declaration} decl
 * @param {string} value
 * @returns {Declaration} The declaration that was passed in.
 */
function setDeclarationValue(decl, value) {
    const raws = decl.raws

    if (raws.value) {
        raws.value.raw = value
    } else {
        decl.value = value
    }

    return decl
}
