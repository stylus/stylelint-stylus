"use strict"

const rules = require("./rules")
const categories = [
    {
        categoryId: "recommended",
        title: "Possible Errors Rules",
        configDescription:
            "These rules relate to possible syntax or logic errors in Stylus.",
        rules: [],
    },
    {
        categoryId: "standard",
        title: "Standard Rules",
        configDescription: "These rules relate to style guidelines.",
        rules: [],
    },
]

for (const category of categories) {
    category.rules = rules.filter(
        rule =>
            rule.meta.docs.category === category.categoryId &&
            !rule.meta.deprecated
    )
}

const uncategorizedRules = rules.filter(
    rule => !rule.meta.docs.category && !rule.meta.deprecated
)
const deprecatedRules = rules.filter(rule => rule.meta.deprecated)

module.exports = {
    categories,
    uncategorizedRules,
    deprecatedRules,
}
