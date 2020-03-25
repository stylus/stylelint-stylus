"use strict"

const coreRule = require("stylelint/lib/rules/block-opening-brace-space-after")
const warp = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-opening-brace-space-after"

const rule = warp(coreRule, {
    originalRuleName: "block-opening-brace-space-after",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description:
            "require a single space or disallow whitespace after the opening brace of blocks.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
