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
const rules = require("../../lib/rules")

const compareWarnings = comparingChain(
    (warn) => (warn.line != null ? warn.line : -1),
    (warn) => (warn.column != null ? warn.column : -1),
    (warn) => warn.rule || "",
    (warn) => warn.severity || "",
    (warn) => warn.text || "",
)

module.exports = { ruleTester, fixturesTester }

/**
 * @param {string} ruleName
 * @param {string} dir
 */
function ruleTester(ruleName, dir) {
    const rule = rules[ruleName]
    // const config = require(path.resolve(dir, "stylelint.config.js"))

    describe(ruleName, () => {
        runFixtures(dir, {
            assertWarning(warning) {
                assert.ok(
                    warning.text.endsWith(`(${ruleName})`),
                    `Unexpected message: Expected ends with "(${ruleName})", but "${warning.text}"`,
                )
                assert.strictEqual(
                    warning.rule,
                    ruleName,
                    "Unexpected ruleName",
                )
            },
            fixable: rule.meta.fixable,
            checkAutofixWarnings: true,
        })
    })
}

/**
 * @param {string} dir
 * @param {object} options
 */
function fixturesTester(dir, options) {
    describe(dir, () => {
        runFixtures(dir, {
            ...options,
            assertWarning() {
                /* noop */
            },
            fixable: true,
            checkAutofixWarnings: false,
        })
    })
}

function runFixtures(
    dir,
    options = {
        assertWarning(_warning) {
            /* noop */
        },
        fixable: true,
        checkAutofixWarnings: true,
        autofixRepeat: 0,
    },
) {
    for (const fixture of listupFixtures(dir)) {
        describe(`${fixture.name}`, () => {
            it("lint", () =>
                lintFixture(fixture)
                    .then((r) => r.results[0])
                    .then((result) => {
                        assertJsonFile(
                            [...result.warnings].sort(compareWarnings),
                            path.resolve(fixture.dir, "warnings.json"),
                            "Error details do not match.",
                        )

                        if (typeof options[fixture.name] === "function") {
                            options[fixture.name]({ warnings: result.warnings })
                        }

                        for (const warning of result.warnings) {
                            options.assertWarning(warning)
                            assert.strictEqual(
                                warning.severity,
                                "error",
                                "Unexpected severity",
                            )
                            assert.ok(
                                !/^Unknown rule/u.test(warning.text),
                                `Unexpected 'Unknown rule' error: Actual "${warning.text}"`,
                            )
                        }
                    }))

            const lang = fixture.input.endsWith(".styl")
                ? "stylus"
                : fixture.input.endsWith(".css")
                ? "css"
                : null
            if (lang === "stylus" || lang === "css") {
                it("lint with raw parser", () =>
                    lintFixture(fixture, {
                        customSyntax:
                            lang === "stylus"
                                ? require.resolve("postcss-styl")
                                : require.resolve("postcss"),
                    })
                        .then((r) => r.results[0])
                        .then((result) => {
                            assertJsonFile(
                                [...result.warnings].sort(compareWarnings),
                                path.resolve(fixture.dir, "warnings.json"),
                                "Error details do not match.",
                            )

                            if (typeof options[fixture.name] === "function") {
                                options[fixture.name]({
                                    warnings: result.warnings,
                                })
                            }

                            for (const warning of result.warnings) {
                                options.assertWarning(warning)
                                assert.strictEqual(
                                    warning.severity,
                                    "error",
                                    "Unexpected severity",
                                )
                                assert.ok(
                                    !/^Unknown rule/u.test(warning.text),
                                    `Unexpected 'Unknown rule' error: Actual "${warning.text}"`,
                                )
                            }
                        }))
            }

            if (!options.fixable) {
                assertNonFile(fixture.output)
                return
            }
            it("autofix", () => {
                const originalCode = read(fixture.input)

                return autofix(originalCode, options.autofixRepeat).then(
                    ({ output, result }) => {
                        assertTextFile(
                            output,
                            fixture.output,
                            "Output is incorrect.",
                        )
                        if (!options.checkAutofixWarnings) {
                            return undefined
                        }
                        return lintFixture(fixture, { code: output })
                            .then((r) => r.results[0])
                            .then((resultAfter) => {
                                assert.deepStrictEqual(
                                    result.warnings,
                                    resultAfter.warnings,
                                    "Autofixed warnings is incorrect.",
                                )
                            })
                    },
                )

                function autofix(code, repeat = 0) {
                    return lintCode(code, fixture.input, { fix: true })
                        .then((r) => ({
                            output: r.output,
                            result: r.results[0],
                        }))
                        .then(({ output, result }) => {
                            if (output !== code && repeat > 0) {
                                return autofix(output, repeat - 1)
                            }
                            return {
                                output,
                                result,
                            }
                        })
                }
            })
        })
    }
}

function lintFixture(fixture, options = {}) {
    const code = read(fixture.input)
    return lintCode(code, fixture.input, options)
}

function lintCode(code, codeFilename, options = {}) {
    return stylelint.lint({
        code,
        codeFilename,
        ...options,
    })
}

function comparingChain(...extractors) {
    const compares = extractors.map((extractor) => (a, b) => {
        const ae = extractor(a)
        const be = extractor(b)
        if (ae < be) {
            return -1
        }
        if (ae > be) {
            return 1
        }
        return 0
    })
    return (a, b) => {
        for (const compare of compares) {
            const ret = compare(a, b)
            if (ret !== 0) {
                return ret
            }
        }
        return 0
    }
}
