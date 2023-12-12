"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const { whitespaceChecker } = require("../../whitespace-checker")
const { optionsMatches } = require("../../option")
const {
    hasBlock,
    hasEmptyBlock,
    blockString,
    beforeBlockString,
} = require("../../ast")

const ruleName = "block-opening-brace-space-after"

const messages = ruleMessages(ruleName, {
    expectedAfter: () => 'Expected single space after "{"',
    rejectedAfter: () => 'Unexpected whitespace after "{"',
    expectedAfterSingleLine: () =>
        'Expected single space after "{" of a single-line block',
    rejectedAfterSingleLine: () =>
        'Unexpected whitespace after "{" of a single-line block',
    expectedAfterMultiLine: () =>
        'Expected single space after "{" of a multi-line block',
    rejectedAfterMultiLine: () =>
        'Unexpected whitespace after "{" of a multi-line block',
})

const meta = {
    url: "https://stylelint.io/user-guide/rules/block-opening-brace-space-after",
    fixable: true,
    deprecated: true,
}

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => {
    const checker = whitespaceChecker("space", primary, messages)

    return (root, result) => {
        const validOptions = validateOptions(
            result,
            ruleName,
            {
                actual: primary,
                possible: [
                    "always",
                    "never",
                    "always-single-line",
                    "never-single-line",
                    "always-multi-line",
                    "never-multi-line",
                ],
            },
            {
                actual: secondaryOptions,
                possible: {
                    ignore: ["at-rules"],
                },
                optional: true,
            },
        )

        if (!validOptions) {
            return
        }

        // Check both kinds of statements: rules and at-rules
        root.walkRules(check)

        if (!optionsMatches(secondaryOptions, "ignore", "at-rules")) {
            root.walkAtRules(check)
        }

        /**
         * @param {import('postcss').Rule | import('postcss').AtRule} statement
         */
        function check(statement) {
            // Return early if blockless or has an empty block
            if (!hasBlock(statement) || hasEmptyBlock(statement)) {
                return
            }

            checker.after({
                source: blockString(statement),
                index: 0,
                err: (m) => {
                    if (context.fix) {
                        const statementFirst = statement.first

                        if (statementFirst == null) return

                        if (primary.startsWith("always")) {
                            statementFirst.raws.before = " "

                            return
                        }

                        if (primary.startsWith("never")) {
                            statementFirst.raws.before = ""

                            return
                        }
                    }

                    report({
                        message: m,
                        node: statement,
                        index:
                            beforeBlockString(statement, { noRawBefore: true })
                                .length + 1,
                        result,
                        ruleName,
                    })
                },
            })
        }
    }
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta
module.exports = rule
