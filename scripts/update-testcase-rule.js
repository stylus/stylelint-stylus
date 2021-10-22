"use strict"

const fs = require("fs")
const path = require("path")
const eslint = require("eslint")
const rules = require("./lib/rules")

const ROOT = path.resolve(__dirname, "../tests/runs/lib/rules")

for (const rule of rules) {
    // Update files.
    const filePath = path.resolve(ROOT, `${rule.fileName}.js`)
    const content = `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
"use strict"

const path = require("path")
const { ruleTester } = require("../../../utils/tester")

ruleTester(
    "stylus/${rule.fileName}",
    path.resolve(
        __dirname,
        "../../../fixtures/lib/rules/${rule.fileName}"
    )
)
`
    fs.writeFileSync(filePath, content)
}

// Format files.
const linter = new eslint.ESLint({ fix: true })
linter.lintFiles([ROOT]).then((report) => {
    eslint.ESLint.outputFixes(report)
})
