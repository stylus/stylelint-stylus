"use strict"

const { transformResult, newProxy } = require("../proxy")

module.exports = warp

function warp(coreRule, { originalRuleName, ruleName }) {
    return function rule(expectation, options, context) {
        const verify = coreRule(expectation, options, context)
        return (root, result) => {
            verify(
                createIgnoreNonStandardAtRuleWalkerRoot(root),
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
        }
    }
}

function createIgnoreNonStandardAtRuleWalkerRoot(root) {
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
