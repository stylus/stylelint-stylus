"use strict"

const { createPlugin } = require("stylelint")
const rules = require("./rules")

const rulesPlugins = Object.keys(rules).map(ruleName =>
    createPlugin(ruleName, rules[ruleName].rule)
)

module.exports = rulesPlugins
