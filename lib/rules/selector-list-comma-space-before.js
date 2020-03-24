"use strict"

const { utils } = require("stylelint")
const coreRule = require("stylelint/lib/rules/selector-list-comma-space-before")
const { isWhitespace } = require("../utils/tokens")
const { getSelectors, setSelector } = require("../utils/selector")
const { isSingleLineString } = require("../utils")

const ruleName = "stylus/selector-list-comma-space-before"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description:
            "require a single space or disallow whitespace before the commas of selector lists.",
        category: "standard",
    },
    fixable: true,
}

const messages = utils.ruleMessages(ruleName, {
    rejected: 'Unexpected whitespace before ","',
    expected: 'Expected single space before ","',
})

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            const verify = coreRule(expectation, options, context)
            verify(root, result)
            return
        }
        const validOptions = utils.validateOptions(result, ruleName, {
            actual: expectation,
            possible: [
                "always",
                "never",
                "always-single-line",
                "never-single-line",
            ],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)

        function verifyNode(node) {
            const selectorText =
                (node.raws.selector &&
                    (node.raws.selector.stylus || node.raws.selector.raw)) ||
                node.selector
            const commaSelectors = []
            const selectors = getSelectors(selectorText)
            for (const selector of selectors) {
                if (selector.separater && selector.separater.value === ",") {
                    commaSelectors.push(selector)
                }
            }

            if (
                expectation === "always" ||
                (expectation === "always-single-line" &&
                    isSingleLineString(selectorText))
            ) {
                verifyAlways(node, selectorText, commaSelectors)
            } else if (
                expectation === "never" ||
                (expectation === "never-single-line" &&
                    isSingleLineString(selectorText))
            ) {
                verifyNever(node, selectorText, commaSelectors)
            }
        }

        function verifyAlways(node, selectorText, commaSelectors) {
            const forbiddenTokens = []
            for (const { selector } of commaSelectors) {
                const beforeSelector = selector
                    .slice(0, -1)
                    .filter(token => token.type !== "comment")
                const beforeToken = beforeSelector[beforeSelector.length - 1]

                if (!isWhitespace(beforeToken) || beforeToken.value !== " ") {
                    forbiddenTokens.push(beforeToken)
                }
            }

            if (!forbiddenTokens.length) {
                return
            }

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const token of forbiddenTokens) {
                    if (!isWhitespace(token)) {
                        newStylusSelector += `${selectorText.slice(
                            start,
                            token.range[1]
                        )} `
                    } else {
                        newStylusSelector += `${selectorText.slice(
                            start,
                            token.range[0]
                        )} `
                    }
                    start = token.range[1]
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const token of forbiddenTokens) {
                utils.report({
                    message: messages.expected,
                    node,
                    index: token.range[1],
                    result,
                    ruleName,
                })
            }
        }

        function verifyNever(node, selectorText, commaSelectors) {
            const forbiddenTokens = []
            for (const { selector } of commaSelectors) {
                const beforeSelector = selector.slice(0, -1)

                let beforeToken = beforeSelector.pop()
                while (beforeToken) {
                    if (isWhitespace(beforeToken)) {
                        forbiddenTokens.push(beforeToken)
                    } else {
                        break
                    }
                    beforeToken = beforeSelector.pop()
                }
            }

            if (!forbiddenTokens.length) {
                return
            }

            forbiddenTokens.sort((a, b) => a.range[0] - b.range[0])

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const token of forbiddenTokens) {
                    newStylusSelector += selectorText.slice(
                        start,
                        token.range[0]
                    )
                    start = token.range[1]
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const token of forbiddenTokens) {
                utils.report({
                    message: messages.rejected,
                    node,
                    index: token.range[0],
                    result,
                    ruleName,
                })
            }
        }
    }
}

module.exports = rule
