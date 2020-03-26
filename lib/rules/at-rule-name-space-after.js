"use strict"

const coreRule = require("stylelint/lib/rules/at-rule-name-space-after")
const { warp } = require("../utils/wrapper-rules/atrule-name-rules")
const ruleName = "stylus/at-rule-name-space-after"

const rule = warp(coreRule, {
    originalRuleName: "at-rule-name-space-after",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "require a single space after at-rule names.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
