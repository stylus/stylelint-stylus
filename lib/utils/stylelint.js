"use strict"

module.exports = {
    loadCoreRule,
}

function loadCoreRule(name) {
    const stylelintMod = require("stylelint")
    const stylelint = stylelintMod.default || stylelintMod
    const rule = stylelint.rules && stylelint.rules[name]
    if (rule) {
        return rule
    }
    return Promise.resolve(require(`stylelint/lib/rules/${name}`))
}
