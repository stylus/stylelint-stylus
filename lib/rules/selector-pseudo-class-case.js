"use strict"

const { utils } = require("stylelint")
const coreRule = require("stylelint/lib/rules/selector-pseudo-class-case")
const { transformResult } = require("../utils/proxy")
const { parseSelector } = require("../utils/selector")

const ruleName = "stylus/selector-pseudo-class-case"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description:
            "enforce lowercase or uppercase for pseudo-class selectors.",
        category: "standard",
    },
    fixable: true,
}

const levelOneAndTwoPseudoElements = new Set([
    "before",
    "after",
    "first-line",
    "first-letter",
])

const messages = utils.ruleMessages(ruleName, {
    expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

function verifyCore(expectation, options, context, root, result) {
    const verify = coreRule(expectation, options, context)
    verify(
        root,
        transformResult(result, {
            originalRuleName: "selector-pseudo-class-case",
            ruleName,
        })
    )
}

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            verifyCore(expectation, options, context, root, result)
            return
        }
        const validOptions = utils.validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["lower", "upper"],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)

        function verifyNode(ruleNode) {
            const selector = ruleNode.selector

            if (!selector.includes(":")) {
                return
            }

            const fixedSelector = parseSelector(
                ruleNode.raws.selector
                    ? ruleNode.raws.selector.stylus ||
                          ruleNode.raws.selector.raw
                    : ruleNode.selector,
                result,
                ruleNode,
                selectorTree => {
                    selectorTree.walkPseudos(pseudoNode => {
                        const pseudo = pseudoNode.value

                        if (
                            pseudo.includes("::") ||
                            levelOneAndTwoPseudoElements.has(
                                pseudo.toLowerCase().slice(1)
                            )
                        ) {
                            return
                        }

                        const expectedPseudo =
                            expectation === "lower"
                                ? pseudo.toLowerCase()
                                : pseudo.toUpperCase()

                        if (pseudo === expectedPseudo) {
                            return
                        }

                        if (context.fix) {
                            pseudoNode.value = expectedPseudo

                            return
                        }

                        utils.report({
                            message: messages.expected(pseudo, expectedPseudo),
                            node: ruleNode,
                            index: pseudoNode.sourceIndex,
                            ruleName,
                            result,
                        })
                    })
                }
            )

            if (context.fix) {
                if (ruleNode.raws.selector) {
                    if (ruleNode.raws.selector.stylus) {
                        ruleNode.raws.selector.stylus = fixedSelector
                    } else {
                        ruleNode.raws.selector.raw = fixedSelector
                    }
                } else {
                    ruleNode.selector = fixedSelector
                }
            }
        }
    }
}

module.exports = rule
