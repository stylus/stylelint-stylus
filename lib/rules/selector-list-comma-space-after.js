"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const coreRule = require("stylelint/lib/rules/selector-list-comma-space-after")
const { transformResult } = require("../utils/proxy")
const { isSkipToken, isWhitespace } = require("../utils/tokens")
const { getSelectorTokens, setSelector } = require("../utils/selector")
const { isSingleLineString } = require("../utils")

const ruleName = "stylus/selector-list-comma-space-after"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a single space or disallow whitespace after the commas of selector lists.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expectedAfter: 'Expected single space after ","',
    rejectedAfter: 'Unexpected whitespace after ","',
    expectedAfterSingleLine:
        'Expected single space after "," in a single-line list',
    rejectedAfterSingleLine:
        'Unexpected whitespace after "," in a single-line list',
})

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            const verify = coreRule(expectation, options, context)
            verify(
                root,
                transformResult(result, {
                    originalRuleName: "selector-list-comma-space-after",
                    ruleName,
                })
            )
            return
        }
        const validOptions = validateOptions(result, ruleName, {
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

            let forbiddenPositions = []
            if (
                expectation === "always" ||
                (expectation === "always-single-line" &&
                    isSingleLineString(selectorText))
            ) {
                forbiddenPositions = verifyAlways(commaSelectors, selectors)
            } else if (
                expectation === "never" ||
                (expectation === "never-single-line" &&
                    isSingleLineString(selectorText))
            ) {
                forbiddenPositions = verifyNever(commaSelectors, selectors)
            }

            if (!forbiddenPositions.length) {
                return
            }

            reportOrFix(node, selectorText, forbiddenPositions)
        }

        function verifyAlways(commaSelectors, selectors) {
            const forbiddenPositions = []
            for (const { separater, selectorIndex } of commaSelectors) {
                const afterSelector = selectors[selectorIndex + 1]
                if (!afterSelector) {
                    continue
                }
                if (afterSelector.selector.every(isSkipToken)) {
                    continue
                }
                const nextToken = afterSelector.selector[0]
                const nextNextToken = afterSelector.selector[1]
                if (nextToken.value !== " " || isWhitespace(nextNextToken)) {
                    const nextSelectorToken = afterSelector.selector.find(
                        t => !isWhitespace(t)
                    )
                    forbiddenPositions.push({
                        index: nextToken.range[0],
                        range: [separater.range[1], nextSelectorToken.range[0]],
                    })
                }
            }

            return forbiddenPositions
        }

        function verifyNever(commaSelectors, selectors) {
            const forbiddenPositions = []
            for (const { separater, selectorIndex } of commaSelectors) {
                const afterSelector = selectors[selectorIndex + 1]
                if (!afterSelector) {
                    continue
                }
                if (afterSelector.selector.every(isSkipToken)) {
                    continue
                }
                const nextToken = afterSelector.selector[0]
                if (!nextToken.value.trim()) {
                    const nextSelectorToken = afterSelector.selector.find(
                        t => !isWhitespace(t)
                    )
                    forbiddenPositions.push({
                        index: nextToken.range[0],
                        range: [separater.range[1], nextSelectorToken.range[0]],
                    })
                }
            }

            return forbiddenPositions
        }

        function reportOrFix(node, selectorText, forbiddenPositions) {
            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const { range } of forbiddenPositions) {
                    newStylusSelector += `${selectorText.slice(
                        start,
                        range[0]
                    )}${expectation.startsWith("always") ? " " : ""}`
                    start = range[1]
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const { index } of forbiddenPositions) {
                report({
                    message:
                        expectation === "always"
                            ? messages.expectedAfter
                            : expectation === "always-single-line"
                            ? messages.expectedAfterSingleLine
                            : expectation === "never"
                            ? messages.rejectedAfter
                            : messages.rejectedAfterSingleLine,

                    node,
                    index,
                    result,
                    ruleName,
                })
            }
        }
    }
}
