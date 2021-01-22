"use strict"

//
// This script updates `lib/rules/index.js` file from rule's meta data.
//

const fs = require("fs")
const path = require("path")
const eslint = require("eslint")
const rules = require("./lib/rules")

// Update files.
const filePath = path.resolve(__dirname, "../lib/rules/index.js")
const content = `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
'use strict'

module.exports = {
  ${rules
      .map((rule) => `'${rule.ruleName}': require('./${rule.fileName}')`)
      .join(",\n")}
}
`
fs.writeFileSync(filePath, content)

// Format files.
const linter = new eslint.CLIEngine({ fix: true })
const report = linter.executeOnFiles([filePath])
eslint.CLIEngine.outputFixes(report)
