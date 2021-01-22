// IMPORTANT!
// This file has been automatically generated,
// in order to update it's content execute "npm run update"
"use strict"

const path = require("path")
const assert = require("assert")
const { fixturesTester } = require("../../utils/tester")
const recommendedRuleSet = require("../../../recommended")
const standardRuleSet = require("../../../standard")

const allRules = [
    ...Object.keys(recommendedRuleSet.rules).filter(
        (ruleName) => recommendedRuleSet.rules[ruleName],
    ),
    ...Object.keys(standardRuleSet.rules).filter(
        (ruleName) => standardRuleSet.rules[ruleName],
    ),
]

fixturesTester(path.resolve(__dirname, "../../fixtures/standard"), {
    autofixRepeat: 10,
    "styl-warn"({ warnings }) {
        const targets = [...allRules]
        const remainings = targets.filter((ruleName) =>
            warnings.every((warn) => warn.rule !== ruleName),
        )

        assert.ok(
            remainings.length === 0,
            `"styl-warn/input.styl" must contain all errors. Remaining: [${remainings.join()}]`,
        )
    },
})
