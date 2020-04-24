"use strict"

const coreRule = require("stylelint/lib/rules/at-rule-no-unknown")
const { transformResult } = require("../utils/proxy")
const {
    withWalkerIgnoresNonStandardAtRule,
} = require("../utils/wrapper-rules/atrule-name-rules")

const ruleName = "stylus/at-rule-no-unknown"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow unknown at-rules.",
            category: "recommended",
        },
    },
}

const STYLUS_AT_NAMES = [
    // https://stylus-lang.com/docs/import.html
    "require",
    // https://stylus-lang.com/docs/extend.html
    "extend",
    "extends",
    // https://stylus-lang.com/docs/block.html
    "block",
    // https://stylus-lang.com/docs/literal.html
    "css",
]

function rule(expectation, options, context) {
    return (root, result) => {
        let verify = null
        if (root.source.lang !== "stylus") {
            verify = coreRule(expectation, options, context)
        } else {
            const ignoreAtRules = (options && options.ignoreAtRules) || []
            verify = coreRule(
                expectation,
                {
                    ...(options || {}),
                    ignoreAtRules: [...ignoreAtRules, ...STYLUS_AT_NAMES],
                },
                context
            )
        }

        verify(
            withWalkerIgnoresNonStandardAtRule(root),
            transformResult(result, {
                originalRuleName: "at-rule-no-unknown",
                ruleName,
            })
        )
    }
}
