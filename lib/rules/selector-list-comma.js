"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const {
    getSelectorTokens,
    isSelectorToken,
    setSelector,
} = require("../utils/selector")
const { isLinebreak } = require("../utils/tokens")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/selector-list-comma"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "require or disallow selector list comma.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected comma",
    expected: "Expected comma",
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)

        function verifyNode(node) {
            if (inCssLiteral(node)) {
                return
            }

            const selector =
                (node.raws.selector &&
                    (node.raws.selector.stylus || node.raws.selector.raw)) ||
                node.selector

            if (expectation === "always") {
                verifyAlways(node, selector)
            } else {
                verifyNever(node, selector)
            }
        }

        function verifyAlways(node, selectorText) {
            const forbiddenLinebreaks = []
            const selectors = getSelectorTokens(selectorText)
            for (const { separater, selector } of selectors) {
                if (isLinebreak(separater)) {
                    forbiddenLinebreaks.push({
                        lastToken: selector[selector.length - 1],
                        separater,
                    })
                }
            }

            if (!forbiddenLinebreaks.length) {
                return
            }

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const { lastToken } of forbiddenLinebreaks) {
                    const index = lastToken.range[1]
                    newStylusSelector += `${selectorText.slice(start, index)},`
                    start = index
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const { separater } of forbiddenLinebreaks) {
                report({
                    message: messages.rejected,
                    node,
                    index: separater.range[0],
                    result,
                    ruleName,
                })
            }
        }

        function verifyNever(node, selectorText) {
            const forbiddenCommas = []
            const selectors = getSelectorTokens(selectorText)
            for (
                let selectorIndex = 0;
                selectorIndex < selectors.length;
                selectorIndex++
            ) {
                const { separater } = selectors[selectorIndex]
                if (separater && separater.value === ",") {
                    forbiddenCommas.push({
                        selectorIndex,
                        separater,
                    })
                }
            }
            if (!forbiddenCommas.length) {
                return
            }

            // auto-fix
            if (context.fix) {
                let newStylusSelector = ""
                let start = 0
                for (const { selectorIndex, separater } of forbiddenCommas) {
                    const index = separater.range[0]
                    const before = selectorText.slice(start, index)
                    newStylusSelector += before

                    const beforeToken = selectors[selectorIndex].selector
                        .filter(isSelectorToken)
                        .slice(-1)[0]
                    const afterToken = (
                        selectors[selectorIndex + 1] || { selector: [] }
                    ).selector.filter(isSelectorToken)[0]
                    if (!isLinebreak(beforeToken) && !isLinebreak(afterToken)) {
                        newStylusSelector += context.newline
                    }
                    start = index + 1
                }
                newStylusSelector += selectorText.slice(start)
                setSelector(node, newStylusSelector)
                return
            }

            for (const { separater } of forbiddenCommas) {
                report({
                    message: messages.rejected,
                    node,
                    index: separater.range[0],
                    result,
                    ruleName,
                })
            }
        }
    }
}
