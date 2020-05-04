"use strict"

const fs = require("fs")
const path = require("path")
const {
    categories,
    uncategorizedRules,
    deprecatedRules,
} = require("./lib/categories")
const ruleSets = require("./lib/rule-sets")

function toRuleRow(rule) {
    const mark = `${rule.meta.fixable ? ":wrench:" : ""}${
        rule.meta.deprecated ? ":warning:" : ""
    }`
    const link = `[${rule.ruleName}](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/${rule.fileName}.html)`
    const description = rule.meta.docs.description || "(no description)"
    const preset = ruleSets.getRuleSets(rule.ruleName)

    return `| ${mark} | ${link} | ${description} | ${
        preset ? `\`/${preset.preset}\`` : ""
    } |`
}

function toDeprecatedRuleRow(rule) {
    const link = `[${rule.ruleName}](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/${rule.fileName}.html)`
    const replacedRules = rule.meta.docs.replacedBy || []
    const replacedBy = replacedRules
        .map(
            name =>
                `[stylus/${name}](https://ota-meshi.github.io/stylelint-plugin-stylus/rules/${name}.html)`
        )
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
|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
${category.rules.map(toRuleRow).join("\n")}
`
        : ""
}`
    )
    .join("")

if (uncategorizedRules.length >= 1) {
    rulesTableContent += `
### Uncategorized

|    | Rule ID | Description | RuleSet |
|:---|:--------|:------------|:--------|
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

const docsReadmeFilePath = path.resolve(__dirname, "../docs/README.md")
fs.writeFileSync(
    docsReadmeFilePath,
    `---
title: "Introduction"
---

${fs
    .readFileSync(readmeFilePath, "utf8")
    .replace(/\.\/docs\//gu, "./")
    .replace(
        /\(https:\/\/ota-meshi.github.io\/stylelint-plugin-stylus\/(.*?)(\.html)?\)/gu,
        (_$0, $1, $2) => `(./${$1}${($2 === ".html" ? ".md" : $2) || ""})`
    )}`
)
