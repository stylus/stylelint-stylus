"use strict"

const fs = require("fs")
const path = require("path")
const ROOT = path.resolve(__dirname, "../../lib/rules")

module.exports = fs
    .readdirSync(ROOT)
    .filter((file) => path.extname(file) === ".js")
    .filter((file) => file !== "index.js")
    .map((file) => path.basename(file, ".js"))
    .map((name) => {
        const rulePath = `${path.join(ROOT, name)}.js`
        const rule = require(rulePath)
        if (typeof rule.rule !== "function") {
            throw new Error(`Expected: rule function @ ${rulePath}`)
        }
        if (rule.ruleName !== `stylus/${name}`) {
            throw new Error(
                `illegal ruleName @ ${rulePath}: Expected: "stylus/${name}"`,
            )
        }
        return {
            ruleName: rule.ruleName,
            fileName: name,
            meta: rule.meta,
        }
    })
