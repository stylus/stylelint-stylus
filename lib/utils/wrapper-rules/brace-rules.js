"use strict"

const { transformResult, newProxy } = require("../proxy")

module.exports = { wrap, withWalkerIgnoresPythonic }

function wrap(coreRule, { originalRuleName, ruleName, wrapOptions }) {
    return function rule(expectation, options, context) {
        const verify = coreRule(expectation, options, context)
        return (root, result) => {
            verify(
                withWalkerIgnoresPythonic(root, wrapOptions),
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
        }
    }
}

function withWalkerIgnoresPythonic(root, wrapOptions) {
    return newProxy(root, {
        walkRules(callback) {
            root.walkRules((node, ...args) => {
                if (node.pythonic) {
                    return
                }
                callback(node, ...args)
            })
        },
        walkAtRules(callback) {
            root.walkAtRules((node, ...args) => {
                if (node.pythonic) {
                    return
                }
                if (node.postfix) {
                    return
                }
                if (wrapOptions && wrapOptions.atRuleProxy) {
                    wrapOptions.atRuleProxy(callback, node, args)
                } else {
                    callback(node, ...args)
                }
            })
        },
    })
}
