"use strict"

const { fail } = require("assert")
const cp = require("child_process")
const path = require("path")

describe("Integration with stylelint v14", () => {
    let originalCwd

    before(() => {
        originalCwd = process.cwd()
        process.chdir(
            path.join(
                __dirname,
                "../../../fixtures/integrations/stylelint-v14",
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
        cp.execSync(`npx stylelint src/valid.styl`, { stdio: "inherit" })
    })
    it("should lint without errors with stylus", () => {
        cp.execSync(`npx stylelint src/valid.stylus`, { stdio: "inherit" })
    })
    it("should lint with errors with styl", () => {
        try {
            cp.execSync(`npx stylelint src/invalid.styl`, { stdio: "inherit" })
            fail("Expect an error, but without errors")
        } catch {
            // Expected!s
        }
    })
    it("should lint with errors with stylus", () => {
        try {
            cp.execSync(`npx stylelint src/invalid.stylus`, {
                stdio: "inherit",
            })
            fail("Expect an error, but without errors")
        } catch {
            // Expected!s
        }
    })
})
