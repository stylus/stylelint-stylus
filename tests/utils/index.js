"use strict"

const fs = require("fs")
const path = require("path")
const assert = require("assert")
const semver = require("semver")

/**
 * @typedef { {
 *   dir: string,
 *   input: string,
 *   output: string,
 *   name: string,
 * } } FixtureData
 */

const utils = {
    isExistFile(file) {
        try {
            fs.statSync(file)
            return true
        } catch (err) {
            if (err.code === "ENOENT") {
                return false
            }
            throw err
        }
    },
    /**
     * listup fixture data
     * @param {*} rootDir
     * @returns {FixtureData[]} results
     */
    listupFixtures(rootDir, fixtureName = "") {
        /**
         * @type {FixtureData[]}
         */
        const result = []
        // eslint-disable-next-line no-process-env -- test
        if (process.env.UPDATE_FIXTURES && !utils.isExistFile(rootDir)) {
            fs.mkdirSync(rootDir)
        }
        for (const name of fs.readdirSync(rootDir)) {
            const filepath = path.join(rootDir, name)
            if (name.startsWith("input.")) {
                const requirementsFileName = path.join(
                    rootDir,
                    "requirements.json",
                )
                if (fs.existsSync(requirementsFileName)) {
                    const requirements = require(requirementsFileName)

                    if (
                        Object.entries(requirements).some(
                            ([pkgName, pkgVersion]) => {
                                const pkg = require(`${pkgName}/package.json`)
                                return !semver.satisfies(
                                    pkg.version,
                                    pkgVersion,
                                )
                            },
                        )
                    ) {
                        continue
                    }
                }
                const ext = path.extname(filepath)
                result.push({
                    dir: rootDir,
                    input: filepath,
                    output: path.join(rootDir, `output${ext}`),
                    name: fixtureName,
                })
                return result
            }
            if (fs.statSync(filepath).isDirectory()) {
                result.push(
                    ...utils.listupFixtures(
                        filepath,
                        fixtureName ? `${fixtureName}/${name}` : name,
                    ),
                )
            }
        }
        return result
    },
    read(file) {
        return fs.readFileSync(file).toString()
    },
    writeFixture(file, actual, error) {
        // eslint-disable-next-line no-process-env -- test
        if (process.env.UPDATE_FIXTURES) {
            fs.writeFileSync(file, actual)
        } else if (error) {
            throw error
        }
    },
    deleteFixture(file, error) {
        // eslint-disable-next-line no-process-env -- test
        if (process.env.UPDATE_FIXTURES && utils.isExistFile(file)) {
            fs.unlinkSync(file)
        } else if (error) {
            throw error
        }
    },
    assertJsonFile(actual, file, message, adjust = (json) => json) {
        try {
            const expected = adjust(require(file))
            assert.deepStrictEqual(adjust(actual), expected, message)
        } catch (error) {
            utils.writeFixture(file, JSON.stringify(actual, null, 2), error)
        }
    },
    assertTextFile(actual, file, message) {
        try {
            const expected = utils.read(file)
            assert.strictEqual(actual, expected, message)
        } catch (error) {
            utils.writeFixture(file, actual, error)
        }
    },
    assertNonFile(file, message) {
        try {
            assert.ok(!utils.isExistFile(file), message)
        } catch (error) {
            utils.deleteFixture(file, error)
        }
    },
}
module.exports = utils
