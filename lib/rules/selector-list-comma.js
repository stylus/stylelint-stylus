"use strict"

const { utils } = require("stylelint")
const { scopedTokens, isSkipToken } = require("../utils/tokens")

const ruleName = "stylus/selector-list-comma"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "require or disallow selector list comma.",
        category: "standard",
    },
    fixable: true,
}

const messages = utils.ruleMessages(ruleName, {
    rejected: "Unexpected comma",
    expected: "Expected comma",
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = utils.validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)

        function verifyNode(node) {
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
            const selectors = getSelectors(selectorText)
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
                utils.report({
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
            const selectors = getSelectors(selectorText)
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
                        .filter(isSkipSelectorToken)
                        .slice(-1)[0]
                    const afterToken = (
                        selectors[selectorIndex + 1] || { selector: [] }
                    ).selector.filter(isSkipSelectorToken)[0]
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
                utils.report({
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

module.exports = rule

function getSelectors(selectorText) {
    const selectors = []
    let selector = []
    let linebreak = null
    for (const { token, scope } of scopedTokens(selectorText)) {
        if (token.value === "," && scope.level === 0) {
            selector.push(token)
            selectors.push({
                selector,
                separater: token,
            })
            selector = []
            linebreak = null
        } else if (
            token.type === "linebreak" &&
            scope.level === 0 &&
            selector.some(t => !isSkipToken(t))
        ) {
            selector.push(token)
            linebreak = token
        } else if (linebreak && !isSkipToken(token)) {
            selectors.push({
                selector,
                separater: linebreak,
            })
            selector = []
            linebreak = null
            selector.push(token)
        } else {
            selector.push(token)
        }
    }
    if (selector.length > 0) {
        selectors.push({
            selector,
            separater: null,
        })
    }

    return selectors
}

function isSkipSelectorToken(token) {
    return token && (!isSkipToken(token) || isLinebreak(token))
}

function isLinebreak(token) {
    return token && token.type === "linebreak"
}

function setSelector(node, selector) {
    if (!node.raws.selector) {
        node.raws.selector = {
            value: node.selector,
        }
    }
    node.raws.selector.stylus = selector
}
