"use strict"

const { createPlugin } = require("stylelint")
const rules = require("./rules")

const rulesPlugins = Object.keys(rules).map((ruleName) => {
    const ruleModule = rules[ruleName]
    const rule = ruleModule.rule
    rule.meta = {
        url: `https://stylus.github.io/stylelint-stylus/rules/${ruleName.replace(
            /^stylus\//u,
            "",
        )}.html`,
        fixable: ruleModule.meta.fixable,
    }
    return createPlugin(ruleName, rule)
})

module.exports = rulesPlugins
