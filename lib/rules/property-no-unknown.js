"use strict"

const coreRule = require("stylelint/lib/rules/property-no-unknown")
const { transformResult, newProxy } = require("../utils/proxy")
const { inCssLiteral, isObjectProperty } = require("../utils/nodes")

const ruleName = "stylus/property-no-unknown"
const originalRuleName = "property-no-unknown"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow unknown properties.",
            category: "recommended",
        },
    },
}

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
        verify(
            withWalkerIgnoreNonStandardPropNodes(root),
            transformResult(result, {
                originalRuleName,
                ruleName,
            })
        )
    }
}

function withWalkerIgnoreNonStandardPropNodes(root) {
    let functionNames = null

    function getFunctionNames() {
        if (functionNames) {
            return functionNames
        }
        functionNames = []
        root.walkAtRules(atRule => {
            if (!atRule.mixin) {
                return
            }

            const identifier =
                atRule.raws.identifier != null ? atRule.raws.identifier : "@"
            if (identifier === "@") {
                return
            }
            const name = atRule.name
            functionNames.push(identifier + name)
        })
        return functionNames
    }

    return newProxy(root, {
        walkDecls(callback) {
            root.walkDecls((node, ...args) => {
                if (isObjectProperty(node)) {
                    return
                }
                if (!inCssLiteral(node)) {
                    const prop = node.prop
                    if (node.assignment) {
                        // ignore valiables
                        // e.g. v = val
                        return
                    }
                    if (prop.includes("{")) {
                        // ignore interpolation
                        return
                    }
                    if (getFunctionNames().includes(prop)) {
                        // use mixin
                        return
                    }
                }
                callback(node, ...args)
            })
        },
    })
}
