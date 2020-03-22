"use strict"

const fs = require("fs")
const path = require("path")
const ROOT = path.resolve(__dirname, "../../lib/rules")

module.exports = fs
    .readdirSync(ROOT)
    .filter(file => path.extname(file) === ".js")
    .filter(file => file !== "index.js")
    .map(file => path.basename(file, ".js"))
    .map(name => {
        const rule = require(path.join(ROOT, name))
        if (rule.ruleName !== `stylus/${name}`) {
            throw new Error(`illegal ruleName @${path.join(ROOT, name)}`)
        }
        return {
            ruleName: rule.ruleName,
            fileName: name,
            meta: rule.meta,
        }
    })
