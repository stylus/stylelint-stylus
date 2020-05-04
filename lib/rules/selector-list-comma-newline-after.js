"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const coreRule = require("stylelint/lib/rules/selector-list-comma-newline-after")
const { transformResult } = require("../utils/proxy")
const { isLinebreak, isSkipToken } = require("../utils/tokens")
const {
    getSelectorTokens,
    isSelectorToken,
    setSelector,
} = require("../utils/selector")
const { isSingleLineString } = require("../utils")

const ruleName = "stylus/selector-list-comma-newline-after"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a newline or disallow whitespace after the commas of selector lists.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expectedAfter: 'Expected newline after ","',
    expectedAfterMultiLine: 'Expected newline after "," in a multi-line list',
    rejectedAfterMultiLine:
        'Unexpected whitespace after "," in a multi-line list',
})

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            const verify = coreRule(expectation, options, context)
            verify(
                root,
                transformResult(result, {
                    originalRuleName: "selector-list-comma-newline-after",
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
            for (
                let selectorIndex = 0;
                selectorIndex < selectors.length;
                selectorIndex++
            ) {
                const selector = selectors[selectorIndex]
                if (selector.separater && selector.separater.value === ",") {
                    commaSelectors.push({
                        selectorIndex,
                        ...selector,
                    })
                }
            }

            if (
                expectation === "always" ||
                (expectation === "always-multi-line" &&
                    !isSingleLineString(selectorText))
            ) {
                verifyAlways(node, selectorText, commaSelectors, selectors)
            } else if (
                expectation === "never-multi-line" &&
                !isSingleLineString(selectorText)
            ) {
                verifyNever(node, selectorText, commaSelectors, selectors)
            }
        }

        function verifyAlways(node, selectorText, commaSelectors, selectors) {
            const forbiddenIndices = []
            for (const { separater, selectorIndex } of commaSelectors) {
                const afterSelector = selectors[selectorIndex + 1]
                if (!afterSelector) {
                    continue
                }
                const nextToken = afterSelector.selector.filter(
                    isSelectorToken
                )[0]
                if (!isLinebreak(nextToken)) {
                    forbiddenIndices.push(
                        nextToken ? nextToken.range[0] : separater.range[1]
                    )
                }
            }

            if (!forbiddenIndices.length) {
                return
            }

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const index of forbiddenIndices) {
                    newStylusSelector += `${selectorText.slice(start, index)}${
                        context.newline
                    }`
                    start = index
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const index of forbiddenIndices) {
                report({
                    message:
                        expectation === "always"
                            ? messages.expectedAfter
                            : messages.expectedAfterMultiLine,
                    node,
                    index,
                    result,
                    ruleName,
                })
            }
        }

        function verifyNever(node, selectorText, commaSelectors, selectors) {
            const forbiddenPositions = []
            for (const { separater, selectorIndex } of commaSelectors) {
                const afterSelector = selectors[selectorIndex + 1]
                if (!afterSelector) {
                    continue
                }
                if (afterSelector.selector.every(isSkipToken)) {
                    continue
                }
                const nextSelectorTokens = afterSelector.selector.filter(
                    isSelectorToken
                )
                const nextToken = nextSelectorTokens[0]
                if (isLinebreak(nextToken)) {
                    forbiddenPositions.push({
                        index: nextToken.range[0],
                        range: [
                            separater.range[1],
                            nextSelectorTokens[1]
                                ? nextSelectorTokens[1].range[0]
                                : nextToken.range[1],
                        ],
                    })
                }
            }

            if (!forbiddenPositions.length) {
                return
            }

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const { range } of forbiddenPositions) {
                    newStylusSelector += `${selectorText.slice(
                        start,
                        range[0]
                    )} `
                    start = range[1]
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const { index } of forbiddenPositions) {
                report({
                    message: messages.rejectedAfterMultiLine,
                    node,
                    index,
                    result,
                    ruleName,
                })
            }
        }
    }
}
