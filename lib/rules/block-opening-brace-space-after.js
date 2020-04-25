"use strict"

const coreRule = require("stylelint/lib/rules/block-opening-brace-space-after")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const { newProxy } = require("../utils/proxy")
const ruleName = "stylus/block-opening-brace-space-after"

const rule = wrap(coreRule, {
    originalRuleName: "block-opening-brace-space-after",
    ruleName,
    wrapOptions: {
        atRuleProxy(callback, node, args) {
            if (!node.raws || node.raws.identifier == null) {
                callback(node, ...args)
            } else {
                // The mimics by proxy for standard AST, for string length calculations.
                callback(
                    newProxy(node, {
                        get raws() {
                            return newProxy(node.raws, { identifier: "@" })
                        },
                    }),
                    ...args
                )
            }
        },
    },
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a single space or disallow whitespace after the opening brace of blocks.",
            category: "standard",
        },
        fixable: true,
    },
}
