"use strict"

const recommended = require("../../recommended")
const standard = require("../../standard")

module.exports = {
    getRuleSets(ruleName) {
        let options = null
        if ((options = recommended.rules[ruleName])) {
            return {
                preset: "recommended",
                options,
            }
        } else if ((options = standard.rules[ruleName])) {
            return {
                preset: "standard",
                options,
            }
        }
        return null
    },
}
