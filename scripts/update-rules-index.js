"use strict"

//
// This script updates `lib/rules/index.js` file from rule's meta data.
//

const path = require("path")
const rules = require("./lib/rules")
const { formatAndSave } = require("./lib/utils")

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

formatAndSave(filePath, content)
