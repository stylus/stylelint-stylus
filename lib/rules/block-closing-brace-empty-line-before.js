"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-empty-line-before")
const { warp } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-empty-line-before"

const rule = warp(coreRule, {
    originalRuleName: "block-closing-brace-empty-line-before",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description:
            "require or disallow an empty line before the closing brace of blocks.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
