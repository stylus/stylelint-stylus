"use strict"

const coreRule = require("stylelint/lib/rules/no-eol-whitespace")
const { transformResult } = require("../utils/proxy")
const ruleName = "stylus/no-eol-whitespace"
const originalRuleName = "no-eol-whitespace"

function rule(expectation, options, context) {
    const verify = coreRule(expectation, options, context)
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            verify(
                root,
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
            return
        }
        if (context.fix) {
            fixForStylus(root)
        }
        verify(
            root,
            transformResult(result, {
                originalRuleName,
                ruleName,
            })
        )
    }
}

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow end-of-line whitespace.",
            category: "standard",
        },
        fixable: true,
    },
}

function fixForStylus(root) {
    root.walkAtRules(fixForPythonic)
    root.walkRules(fixForPythonic)

    function fixForPythonic(node) {
        if (!node.pythonic) {
            return
        }

        if (node.raws.between) {
            node.raws.between = node.raws.between.replace(
                /(^|[\r\n])[^\S\r\n]+$/u,
                ""
            )
        }
    }
}
