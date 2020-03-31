"use strict"

const coreRule = require("stylelint/lib/rules/number-leading-zero")
const { warp } = require("../utils/wrapper-rules/number-rules")
const ruleName = "stylus/number-leading-zero"

const rule = warp(coreRule, {
    originalRuleName: "number-leading-zero",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require or disallow a leading zero for fractional numbers less than 1.",
            category: "standard",
        },
        fixable: true,
    },
}
