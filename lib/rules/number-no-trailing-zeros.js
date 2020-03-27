"use strict"

const coreRule = require("stylelint/lib/rules/number-no-trailing-zeros")
const { warp } = require("../utils/wrapper-rules/number-rules")
const ruleName = "stylus/number-no-trailing-zeros"

const rule = warp(coreRule, {
    originalRuleName: "number-no-trailing-zeros",
    ruleName,
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "disallow trailing zeros in numbers.",
        category: "standard",
    },
    fixable: true,
}

module.exports = rule
