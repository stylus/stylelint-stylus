"use strict"

const coreRule = require("stylelint/lib/rules/block-opening-brace-newline-after")
const { warp } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-opening-brace-newline-after"

const rule = warp(coreRule, {
    originalRuleName: "block-opening-brace-newline-after",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "require a newline after the opening brace of blocks.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
