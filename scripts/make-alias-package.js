"use strict"

const fs = require("fs")
const path = require("path")
const packageJson = require("../package.json")
const { formatAndSave } = require("./lib/utils")

const ALIAS = "stylelint-plugin-stylus"

const ROOT_PATH = path.resolve(__dirname, "..")
const ALIAS_ROOT_PATH = path.resolve(ROOT_PATH, "./alias-package")
const PACKAGE_FILE_PATH = path.resolve(ALIAS_ROOT_PATH, "./package.json")

const srcName = packageJson.name

// Copy package
const mainContent = `"use strict"

module.exports = require('${srcName}')
`
const mainPath = path.resolve(ALIAS_ROOT_PATH, packageJson.main)
formatAndSave(mainPath, mainContent)

for (const libDir of packageJson.files) {
    if (libDir === "lib") continue
    const libContent = `"use strict"
    
    module.exports = require('${srcName}/${libDir}')
    `
    const libDirPath = path.resolve(ALIAS_ROOT_PATH, `${libDir}/index.js`)
    formatAndSave(libDirPath, libContent)
}

delete packageJson.devDependencies
delete packageJson.scripts
packageJson.dependencies = {
    [srcName]: `^${packageJson.version}`,
}
packageJson.name = ALIAS

formatAndSave(PACKAGE_FILE_PATH, JSON.stringify(packageJson))

// Copy README
for (const target of ["./README.md", "./LICENSE"]) {
    const srcPath = path.resolve(ROOT_PATH, target)
    const aliasPath = path.resolve(ALIAS_ROOT_PATH, target)

    let content = fs.readFileSync(srcPath, "utf8")
    content = content.replace(new RegExp(srcName, "gu"), ALIAS)

    for (const revertRe of [
        new RegExp(`\\/stylus\\/${ALIAS}`),
        `\\.github\\.io\\/${ALIAS}`,
        `www\\.npmjs\\.com\\/package\\/${ALIAS}`,
        `img\\.shields\\.io\\/npm\\/.+\\/${ALIAS}.svg`,
    ]) {
        content = content.replace(new RegExp(revertRe, "gu"), (match) =>
            match.replace(new RegExp(ALIAS, "gu"), srcName),
        )
    }

    if (target === "./README.md") {
        content = `<h1 align="center">This package is an alias for <a href="https://www.npmjs.com/package/${srcName}">${srcName}</a>. We recommend using <a href="https://www.npmjs.com/package/${srcName}">${srcName}</a> directly. This package will be DEPRECATED in the future.</h1>

${content}`
    }

    formatAndSave(aliasPath, content)
}
