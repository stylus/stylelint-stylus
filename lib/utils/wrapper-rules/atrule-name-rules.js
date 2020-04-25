"use strict"

const { transformResult, newProxy } = require("../proxy")

module.exports = { wrap, withWalkerIgnoresNonStandardAtRule }

function wrap(coreRule, { originalRuleName, ruleName }) {
    return function rule(expectation, options, context) {
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
            verify(
                withWalkerIgnoresNonStandardAtRule(root),
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
        }
    }
}

function withWalkerIgnoresNonStandardAtRule(root) {
    return newProxy(root, {
        walkAtRules(callback) {
            root.walkAtRules((node, ...args) => {
                const identifier =
                    node.raws.identifier != null ? node.raws.identifier : "@"
                if (identifier !== "@") {
                    return
                }
                callback(node, ...args)
            })
        },
    })
}
