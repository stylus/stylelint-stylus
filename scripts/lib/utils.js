"use strict"

const fs = require("fs")
const path = require("path")
const { ESLint } = require("eslint")
const eslint = new ESLint({ fix: true })

/** Run eslint fix */
module.exports = {
    formatAndSave,
}

/** Run eslint fix */
async function formatAndSave(filename, text) {
    const lintResults = await eslint.lintText(text, { filePath: filename })
    const output = lintResults[0].output || text
    makeDirs(path.dirname(filename))
    fs.writeFileSync(filename, output)
    return output
}

/** Make dirs */
function makeDirs(dir) {
    if (fs.existsSync(dir)) {
        return
    }
    const parent = path.dirname(dir)
    makeDirs(parent)
    fs.mkdirSync(dir)
}
