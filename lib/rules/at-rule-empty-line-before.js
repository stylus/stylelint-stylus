"use strict"

const coreRule = require("stylelint/lib/rules/at-rule-empty-line-before")
const { warp } = require("../utils/wrapper-rules/atrule-name-rules")
const ruleName = "stylus/at-rule-empty-line-before"

const rule = warp(coreRule, {
    originalRuleName: "at-rule-empty-line-before",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "require or disallow an empty line before at-rules.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
