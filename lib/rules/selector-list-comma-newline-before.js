"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const coreRule = require("stylelint/lib/rules/selector-list-comma-newline-before")
const { transformResult } = require("../utils/proxy")
const { isLinebreak, isSkipToken, isWhitespace } = require("../utils/tokens")
const { getSelectorTokens, setSelector } = require("../utils/selector")
const { isSingleLineString } = require("../utils")

const ruleName = "stylus/selector-list-comma-newline-before"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a newline or disallow whitespace before the commas of selector lists.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expectedBefore: 'Expected newline before ","',
    expectedBeforeMultiLine: 'Expected newline before "," in a multi-line list',
    rejectedBeforeMultiLine:
        'Unexpected whitespace before "," in a multi-line list',
})

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            const verify = coreRule(expectation, options, context)
            verify(
                root,
                transformResult(result, {
                    originalRuleName: "selector-list-comma-newline-before",
                    ruleName,
                })
            )
            return
        }
        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "always-multi-line", "never-multi-line"],
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
            const selectors = getSelectorTokens(selectorText)
            for (const selector of selectors) {
                if (selector.separater && selector.separater.value === ",") {
                    commaSelectors.push(selector)
                }
            }

            if (
                expectation === "always" ||
                (expectation === "always-multi-line" &&
                    !isSingleLineString(selectorText))
            ) {
                verifyAlways(node, selectorText, commaSelectors)
            } else if (
                expectation === "never-multi-line" &&
                !isSingleLineString(selectorText)
            ) {
                verifyNever(node, selectorText, commaSelectors, selectors)
            }
        }

        function verifyAlways(node, selectorText, commaSelectors) {
            const forbiddenTokens = []
            for (const { selector } of commaSelectors) {
                const beforeSelector = selector.slice(0, -1)

                let beforeToken = beforeSelector.pop()
                const forbiddenToken = beforeToken
                let hasLinebreak = false
                while (beforeToken) {
                    if (isSkipToken(beforeToken)) {
                        if (isLinebreak(beforeToken)) {
                            hasLinebreak = true
                            break
                        }
                    } else {
                        break
                    }
                    beforeToken = beforeSelector.pop()
                }
                if (!hasLinebreak) {
                    forbiddenTokens.push(forbiddenToken)
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
                        )}${context.newline}`
                    } else {
                        newStylusSelector += `${selectorText.slice(
                            start,
                            token.range[0]
                        )}${context.newline}`
                    }
                    start = token.range[1]
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const token of forbiddenTokens) {
                report({
                    message:
                        expectation === "always"
                            ? messages.expectedBefore
                            : messages.expectedBeforeMultiLine,
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
                        if (isLinebreak(beforeToken)) {
                            forbiddenTokens.push(beforeToken)
                        }
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
                report({
                    message: messages.rejectedBeforeMultiLine,
                    node,
                    index: token.range[0],
                    result,
                    ruleName,
                })
            }
        }
    }
}
