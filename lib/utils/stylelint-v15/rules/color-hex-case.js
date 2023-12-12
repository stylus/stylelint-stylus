"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const valueParser = require("postcss-value-parser")
const { getDeclarationValue, declarationValueIndex } = require("../../ast")
const { setDeclarationValue } = require("../../fix")

const ruleName = "color-hex-case"

const messages = ruleMessages(ruleName, {
    expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

const meta = {
    url: "https://stylelint.io/user-guide/rules/color-hex-case",
    fixable: true,
    deprecated: true,
}

const HEX = /^#[\da-z]+/i
const CONTAINS_HEX = /#[\da-z]+/i
const IGNORED_FUNCTIONS = new Set(["url"])

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
    return (root, result) => {
        const validOptions = validateOptions(result, ruleName, {
            actual: primary,
            possible: ["lower", "upper"],
        })

        if (!validOptions) {
            return
        }

        root.walkDecls((decl) => {
            if (!CONTAINS_HEX.test(decl.value)) return

            const parsedValue = valueParser(getDeclarationValue(decl))
            let needsFix = false

            parsedValue.walk((node) => {
                const { value } = node

                if (isIgnoredFunction(node)) return false

                if (!isHexColor(node)) return undefined

                const expected =
                    primary === "lower"
                        ? value.toLowerCase()
                        : value.toUpperCase()

                if (value === expected) return undefined

                if (context.fix) {
                    node.value = expected
                    needsFix = true

                    return undefined
                }

                report({
                    message: messages.expected(value, expected),
                    node: decl,
                    index: declarationValueIndex(decl) + node.sourceIndex,
                    result,
                    ruleName,
                })
                return undefined
            })

            if (needsFix) {
                setDeclarationValue(decl, parsedValue.toString())
            }
        })
    }
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isIgnoredFunction({ type, value }) {
    return type === "function" && IGNORED_FUNCTIONS.has(value.toLowerCase())
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isHexColor({ type, value }) {
    return type === "word" && HEX.test(value)
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta
module.exports = rule
