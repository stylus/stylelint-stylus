"use strict"

const path = require("path")
const assert = require("assert")
const stylelint = require("stylelint")
const {
    listupFixtures,
    assertNonFile,
    read,
    assertJsonFile,
    assertTextFile,
} = require("./index")
const rules = require("../..")

module.exports = run

/**
 * @param {string} ruleName
 * @param {string} dir
 */
function run(ruleName, dir) {
    const rule = rules.find(r => r.ruleName === ruleName)
    // const config = require(path.resolve(dir, "stylelint.config.js"))

    describe(ruleName, () => {
        for (const fixture of listupFixtures(dir)) {
            describe(`${fixture.name}`, () => {
                it("lint", () =>
                    lintFixture(fixture)
                        .then(r => r.results[0])
                        .then(result => {
                            assertJsonFile(
                                result.warnings,
                                path.resolve(fixture.dir, "warnings.json"),
                                "Error details do not match."
                            )
                        }))

                if (!rule.rule.meta.fixable) {
                    assertNonFile(fixture.output)
                    return
                }
                it("autofix", () =>
                    lintFixture(fixture, { fix: true })
                        .then(r => ({
                            output: r.output,
                            result: r.results[0],
                        }))
                        .then(({ output, result }) => {
                            assertTextFile(
                                output,
                                fixture.output,
                                "Output is incorrect."
                            )
                            return lintFixture(fixture, { code: output })
                                .then(r => r.results[0])
                                .then(resultAfter => {
                                    assert.deepStrictEqual(
                                        result.warnings,
                                        resultAfter.warnings,
                                        "Autofixed warnings is incorrect."
                                    )
                                })
                        }))
            })
        }
    })

    function lintFixture(fixture, options = {}) {
        const code = read(fixture.input)
        return stylelint.lint({
            code,
            codeFilename: fixture.input,
            customSyntax: require.resolve("../../custom-syntax"),
            ...options,
        })
    }
}
