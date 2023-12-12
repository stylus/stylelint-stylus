"use strict"

const _ = require("lodash")
const { loadCoreRule } = require("../utils/stylelint")
const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const coreRule = loadCoreRule("selector-type-no-unknown")
const { transformResult } = require("../utils/proxy")
const {
    parseSelector,
    isStandardSyntaxTypeSelector,
} = require("../utils/selector")
const svgTags = require("svg-tags")
const mathMLTags = require("mathml-tag-names")
const { isKeyframeSelector, isCustomElement } = require("../utils/text")
const { optionsMatches } = require("../utils/option")
const { htmlTypeSelectors } = require("../utils/reference/selector")

const ruleName = "stylus/selector-type-no-unknown"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow unknown type selectors.",
            category: "recommended",
        },
    },
}

const messages = ruleMessages(ruleName, {
    rejected: (selector) => `Unexpected unknown type selector "${selector}"`,
})

async function verifyCore(expectation, options, context, root, result) {
    const verify = (await coreRule)(expectation, options, context)
    verify(
        root,
        transformResult(result, {
            originalRuleName: "selector-type-no-unknown",
            ruleName,
        }),
    )
}

function rule(expectation, options, context) {
    return async (root, result) => {
        if (root.source.lang !== "stylus") {
            await verifyCore(expectation, options, context, root, result)
            return
        }
        const validOptions = validateOptions(
            result,
            ruleName,
            { actual: expectation },
            {
                actual: options,
                possible: {
                    ignore: ["custom-elements", "default-namespace"],
                    ignoreNamespaces: [_.isString, _.isRegExp],
                    ignoreTypes: [_.isString, _.isRegExp],
                },
                optional: true,
            },
        )

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)

        function verifyNode(ruleNode) {
            const rawSelector =
                (ruleNode.raws.selector
                    ? ruleNode.raws.selector.stylus ||
                      ruleNode.raws.selector.raw
                    : ruleNode.selector) || ""
            const selectors = ruleNode.selectors

            if (selectors.some((s) => isKeyframeSelector(s))) {
                return
            }

            parseSelector(rawSelector, result, ruleNode, (selectorTree) => {
                selectorTree.walkTags((tagNode) => {
                    if (!isStandardSyntaxTypeSelector(tagNode)) {
                        return
                    }

                    if (
                        optionsMatches(options, "ignore", "custom-elements") &&
                        isCustomElement(tagNode.value)
                    ) {
                        return
                    }

                    if (
                        optionsMatches(
                            options,
                            "ignore",
                            "default-namespace",
                        ) &&
                        !(typeof tagNode.namespace === "string")
                    ) {
                        return
                    }

                    if (
                        optionsMatches(
                            options,
                            "ignoreNamespaces",
                            tagNode.namespace,
                        )
                    ) {
                        return
                    }

                    if (optionsMatches(options, "ignoreTypes", tagNode.value)) {
                        return
                    }

                    const tagName = tagNode.value
                    const tagNameLowerCase = tagName.toLowerCase()

                    if (
                        htmlTypeSelectors.has(tagNameLowerCase) ||
                        // SVG tags are case-sensitive
                        svgTags.includes(tagName) ||
                        mathMLTags.includes(tagNameLowerCase)
                    ) {
                        return
                    }

                    report({
                        message: messages.rejected(tagName),
                        node: ruleNode,
                        index: tagNode.sourceIndex,
                        ruleName,
                        result,
                    })
                })
            })
        }
    }
}
