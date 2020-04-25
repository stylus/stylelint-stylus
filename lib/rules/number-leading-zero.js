"use strict"

const coreRule = require("stylelint/lib/rules/number-leading-zero")
const { wrap } = require("../utils/wrapper-rules/number-rules")
const ruleName = "stylus/number-leading-zero"

const rule = wrap(coreRule, {
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
