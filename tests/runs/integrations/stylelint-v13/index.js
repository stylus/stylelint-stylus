"use strict"

const { fail } = require("assert")
const cp = require("child_process")
const path = require("path")

const STYLELINT = `.${path.sep}node_modules${path.sep}.bin${path.sep}stylelint`

describe("Integration with stylelint v13", () => {
    let originalCwd

    before(() => {
        originalCwd = process.cwd()
        process.chdir(
            path.join(
                __dirname,
                "../../../fixtures/integrations/stylelint-v13",
            ),
        )
        cp.execSync("npm i --no-package-lock --legacy-peer-deps", {
            stdio: "inherit",
        })
    })
    after(() => {
        process.chdir(originalCwd)
    })

    it("should lint without errors with styl", () => {
        cp.execSync(
            `${STYLELINT} src/valid.styl --custom-syntax stylelint-plugin-stylus/custom-syntax`,
            { stdio: "inherit" },
        )
    })
    it("should lint without errors with stylus", () => {
        cp.execSync(
            `${STYLELINT} src/valid.stylus --custom-syntax stylelint-plugin-stylus/custom-syntax`,
            { stdio: "inherit" },
        )
    })
    it("should lint with errors with styl", () => {
        try {
            cp.execSync(
                `${STYLELINT} src/invalid.styl --custom-syntax stylelint-plugin-stylus/custom-syntax`,
                { stdio: "inherit" },
            )
            fail("Expect an error, but without errors")
        } catch {
            // Expected!s
        }
    })
    it("should lint with errors with stylus", () => {
        try {
            cp.execSync(
                `${STYLELINT} src/invalid.stylus --custom-syntax stylelint-plugin-stylus/custom-syntax`,
                { stdio: "inherit" },
            )
            fail("Expect an error, but without errors")
        } catch {
            // Expected!s
        }
    })
})
