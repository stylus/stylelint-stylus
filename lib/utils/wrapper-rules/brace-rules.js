"use strict"

const { transformResult, newProxy } = require("../proxy")

module.exports = { warp, withWalkerIgnoresPythonic }

function warp(coreRule, { originalRuleName, ruleName }) {
    return function rule(expectation, options, context) {
        const verify = coreRule(expectation, options, context)
        return (root, result) => {
            verify(
                withWalkerIgnoresPythonic(root),
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
        }
    }
}

function withWalkerIgnoresPythonic(root) {
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
                callback(node, ...args)
            })
        },
    })
}
