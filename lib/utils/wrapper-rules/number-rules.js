"use strict"

const { transformResult, newProxy } = require("../proxy")

module.exports = { wrap, withWalkerIgnoresDotDot }

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
                withWalkerIgnoresDotDot(root),
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                })
            )
        }
    }
}

function withWalkerIgnoresDotDot(root) {
    return newProxy(root, {
        walkAtRules(callback) {
            root.walkAtRules((node, ...args) => {
                // const identifier =
                //     node.raws.identifier != null ? node.raws.identifier : "@"
                // const name = node.name.toLowerCase()
                // const atRuleName = identifier + name
                // if (atRuleName === "for") {
                //     return
                // }
                const params = node.params || ""
                if (params.includes("..")) {
                    return
                }
                callback(node, ...args)
            })
        },
        walkDecls(callback) {
            root.walkDecls((node, ...args) => {
                const value = node.value || ""
                if (value.includes("..")) {
                    return
                }
                callback(node, ...args)
            })
        },
    })
}
