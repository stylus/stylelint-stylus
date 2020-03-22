"use strict"

const fs = require("fs")
const path = require("path")
const assert = require("assert")

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
    listupFixtures(rootDir) {
        /**
         * @type {FixtureData[]}
         */
        const result = []
        for (const name of fs.readdirSync(rootDir)) {
            const filepath = path.join(rootDir, name)
            if (name.startsWith("input.")) {
                const ext = path.extname(filepath)
                result.push({
                    dir: rootDir,
                    input: filepath,
                    output: path.join(rootDir, `output${ext}`),
                    name,
                })
            }
            if (fs.statSync(filepath).isDirectory()) {
                result.push(...utils.listupFixtures(filepath))
            }
        }
        return result
    },
    read(file) {
        return fs.readFileSync(file).toString()
    },
    writeFixture(file, actual, error) {
        // eslint-disable-next-line no-process-env
        if (process.env.UPDATE_FIXTURES) {
            fs.writeFileSync(file, actual)
        } else if (error) {
            throw error
        }
    },
    deleteFixture(file) {
        // eslint-disable-next-line no-process-env
        if (process.env.UPDATE_FIXTURES && utils.isExistFile(file)) {
            fs.unlinkSync(file)
        }
    },
    assertJsonFile(actual, file, message) {
        try {
            const expected = require(file)
            assert.deepStrictEqual(actual, expected, message)
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
}
module.exports = utils
