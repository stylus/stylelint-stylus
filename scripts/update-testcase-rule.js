"use strict"

const path = require("path")
const rules = require("./lib/rules")
const { formatAndSave } = require("./lib/utils")

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
    formatAndSave(filePath, content)
}
