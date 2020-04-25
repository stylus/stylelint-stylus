"use strict"

const coreRule = require("stylelint/lib/rules/number-no-trailing-zeros")
const { wrap } = require("../utils/wrapper-rules/number-rules")
const ruleName = "stylus/number-no-trailing-zeros"

const rule = wrap(coreRule, {
    originalRuleName: "number-no-trailing-zeros",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow trailing zeros in numbers.",
            category: "standard",
        },
        fixable: true,
    },
}
