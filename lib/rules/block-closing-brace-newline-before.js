"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-newline-before")
const warp = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-newline-before"

const rule = warp(coreRule, {
    originalRuleName: "block-closing-brace-newline-before",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description:
            "require a newline or disallow whitespace before the closing brace of blocks.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
