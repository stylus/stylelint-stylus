"use strict"

const fs = require("fs")
const path = require("path")
const rules = require("./lib/rules")

const categories = [
    {
        categoryId: "standard",
        title: "Standard Rules",
        configDescription: "These rules relate to style guidelines.",
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

function toRuleRow(rule) {
    const mark = `${rule.meta.fixable ? ":wrench:" : ""}${
        rule.meta.deprecated ? ":warning:" : ""
    }`
    const link = `[${rule.ruleName}](./docs/rules/${rule.fileName}.md)`
    const description = rule.meta.docs.description || "(no description)"

    return `| ${mark} | ${link} | ${description} |`
}

function toDeprecatedRuleRow(rule) {
    const link = `[${rule.ruleName}](./docs/rules/${rule.fileName}.md)`
    const replacedRules = rule.meta.docs.replacedBy || []
    const replacedBy = replacedRules
        .map(name => `[stylus/${name}](./docs/rules/${name}.md)`)
        .join(", ")

    return `| ${link} | ${replacedBy || "(no replacement)"} |`
}

let rulesTableContent = categories
    .map(
        category => `
### ${category.title}

${category.configDescription}
${
    category.rules.length
        ? `
|    | Rule ID | Description |
|:---|:--------|:------------|
${category.rules.map(toRuleRow).join("\n")}
`
        : ""
}`
    )
    .join("")

if (uncategorizedRules.length >= 1) {
    rulesTableContent += `
### Uncategorized

|    | Rule ID | Description |
|:---|:--------|:------------|
${uncategorizedRules.map(toRuleRow).join("\n")}
`
}

if (deprecatedRules.length >= 1) {
    rulesTableContent += `
### Deprecated

> - :warning: We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.
> - :innocent: We don't fix bugs which are in deprecated rules since we don't have enough resources.

| Rule ID | Replaced by |
|:--------|:------------|
${deprecatedRules.map(toDeprecatedRuleRow).join("\n")}
`
}

const insertText = `\n${rulesTableContent}\n`

const readmeFilePath = path.resolve(__dirname, "../README.md")
fs.writeFileSync(
    readmeFilePath,
    fs
        .readFileSync(readmeFilePath, "utf8")
        .replace(
            /<!--RULES_TABLE_START-->[\s\S]*<!--RULES_TABLE_END-->/u,
            `<!--RULES_TABLE_START-->${insertText}<!--RULES_TABLE_END-->`
        )
)
