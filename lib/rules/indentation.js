"use strict"

const coreRule = require("stylelint/lib/rules/indentation")
const { transformResult, newProxy } = require("../utils/proxy")

const ruleName = "stylus/indentation"
const originalRuleName = "indentation"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "enforces indentation.",
            category: "standard",
        },
        fixable: true,
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
            withWalkerWrapNodes(root),
            transformResult(result, {
                originalRuleName,
                ruleName,
            })
        )
    }
}

function withWalkerWrapNodes(root) {
    return newProxy(root, {
        walk(callback) {
            root.walk((node, ...args) => {
                const wrapper = {}
                if (node.parent && node.parent.postfix) {
                    Object.defineProperty(wrapper, "parent", {
                        get() {
                            return node.parent.parent
                        },
                    })
                }
                if (
                    node.type === "rule" &&
                    node.raws.selector &&
                    node.raws.selector.stylus
                ) {
                    Object.defineProperty(wrapper, "selector", {
                        get() {
                            return node.raws.selector.stylus
                        },
                        set(selector) {
                            node.raws.selector.stylus = selector
                        },
                    })
                }
                if (Object.getOwnPropertyNames(wrapper).length) {
                    callback(newProxy(node, wrapper), ...args)
                } else {
                    callback(node, ...args)
                }
            })
        },
    })
}
