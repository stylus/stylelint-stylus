"use strict"

const fs = require("fs")
const path = require("path")
const rules = require("./lib/rules")
const ruleSets = require("./lib/rule-sets")

const ROOT = path.resolve(__dirname, "../docs/rules")

function formatItems(items) {
    if (items.length <= 2) {
        return items.join(" and ")
    }
    return `all of ${items.slice(0, -1).join(", ")} and ${
        items[items.length - 1]
    }`
}

class DocFile {
    constructor(rule) {
        this.rule = rule
        this.filePath = path.join(ROOT, `${rule.fileName}.md`)
        try {
            this.content = fs.readFileSync(this.filePath, "utf8")
        } catch (_e) {
            this.content = ""
        }
    }

    static read(rule) {
        return new DocFile(rule)
    }

    write() {
        fs.writeFileSync(this.filePath, this.content)
    }

    updateFileIntro() {
        // const { ruleName, meta } = this.rule

        // const fileIntro = {
        //     pageClass: "rule-details",
        //     sidebarDepth: 0,
        //     title: ruleName,
        //     description: meta.docs.description,
        // }
        // const computed = `---\n${Object.entries(fileIntro)
        //     .map(item => `${item[0]}: ${item[1]}`)
        //     .join("\n")}\n---\n`
        const computed = ""

        const fileIntroPattern = /^---\n(.*\n)+---\n*/gu

        if (fileIntroPattern.test(this.content)) {
            this.content = this.content.replace(fileIntroPattern, computed)
        } else {
            this.content = `${computed}${this.content.trim()}\n`
        }

        return this
    }

    updateHeader() {
        const { ruleName, meta } = this.rule
        const title = `# ${ruleName}\n\n> ${meta.docs.description}`
        const notes = []

        if (meta.deprecated) {
            if (meta.docs.replacedBy) {
                const replacedRules = meta.docs.replacedBy.map(
                    (name) => `[stylus/${name}](${name}.md) rule`,
                )
                notes.push(
                    `- :warning: This rule was **deprecated** and replaced by ${formatItems(
                        replacedRules,
                    )}.`,
                )
            } else {
                notes.push("- :warning: This rule was **deprecated**.")
            }
        } else {
            let presets = null
            const { preset, options } = ruleSets.getRuleSets(ruleName) || {}

            if (preset === "recommended") {
                presets = [
                    '`"stylelint-plugin-stylus/recommended"`',
                    '`"stylelint-plugin-stylus/standard"`',
                ]
            } else if (preset === "standard") {
                presets = ['`"stylelint-plugin-stylus/standard"`']
            }

            if (presets) {
                notes.push(
                    `- :gear: This rule is included in ${formatItems(
                        presets,
                    )}. (options: \`${JSON.stringify(options)}\`)`,
                )
            }
        }
        if (meta.fixable) {
            notes.push(
                "- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.",
            )
        }

        // Add an empty line after notes.
        if (notes.length >= 1) {
            notes.push("", "")
        }

        const headerPattern = /#.+\n{1,2}[^\n]*\n+(?:- .+\n)*\n*/u
        const header = `${title}\n\n${notes.join("\n")}`
        if (headerPattern.test(this.content)) {
            this.content = this.content.replace(headerPattern, header)
        } else {
            this.content = `${header}${this.content.trim()}\n`
        }

        return this
    }

    updateFooter() {
        const { fileName } = this.rule
        const footerPattern = /## :mag: Implementation.+$/su
        const footer = `## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/${fileName}.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/${fileName}.js)
`
        if (footerPattern.test(this.content)) {
            this.content = this.content.replace(footerPattern, footer)
        } else {
            this.content = `${this.content.trim()}\n\n${footer}`
        }

        return this
    }
}

for (const rule of rules) {
    DocFile.read(rule).updateHeader().updateFooter().updateFileIntro().write()
}
