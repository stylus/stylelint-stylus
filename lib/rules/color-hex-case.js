"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const styleSearch = require("style-search")
const coreRule = require("stylelint/lib/rules/color-hex-case")
const { transformResult } = require("../utils/proxy")
const { scopedTokens, isSkipToken } = require("../utils/tokens")

const ruleName = "stylus/color-hex-case"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "enforce lowercase or uppercase for hex colors.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

function verifyCore(expectation, options, context, root, result) {
    const verify = coreRule(expectation, options, context)
    verify(
        root,
        transformResult(result, {
            originalRuleName: "color-hex-case",
            ruleName,
        })
    )
}

function rule(expectation, options, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            verifyCore(expectation, options, context, root, result)
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["lower", "upper"],
        })

        if (!validOptions) {
            return
        }

        root.walkDecls(verifyNode)

        function verifyNode(decl) {
            const declValue =
                (decl.raws.value &&
                    (decl.raws.value.stylus || decl.raws.value.raw)) ||
                decl.value
            const urlRanges = getUrlRanges(declValue)
            const fixPositions = []

            styleSearch({ source: declValue, target: "#" }, match => {
                const hexMatch = /^#[0-9A-Za-z]+/u.exec(
                    declValue.slice(match.startIndex)
                )

                if (!hexMatch) {
                    return
                }

                if (
                    urlRanges.some(
                        range =>
                            range[0] <= match.startIndex &&
                            match.startIndex < range[1]
                    )
                ) {
                    return
                }

                const hexValue = hexMatch[0]
                const expectedHex =
                    expectation === "lower"
                        ? hexValue.toLowerCase()
                        : hexValue.toUpperCase()

                if (hexValue === expectedHex) {
                    return
                }

                if (context.fix) {
                    fixPositions.unshift({
                        expectedHex,
                        currentHex: hexValue,
                        startIndex: match.startIndex,
                    })

                    return
                }

                report({
                    message: messages.expected(hexValue, expectedHex),
                    node: decl,
                    index:
                        (
                            (decl.raws &&
                                decl.raws.prop &&
                                decl.raws.prop.raw) ||
                            decl.prop
                        ).length +
                        (decl.raws.stylusBetween || decl.raws.between || "")
                            .length +
                        match.startIndex,
                    result,
                    ruleName,
                })
            })

            if (fixPositions.length) {
                let fixedDeclValue = declValue

                for (const fixPosition of fixPositions) {
                    fixedDeclValue = replaceHex(
                        fixedDeclValue,
                        fixPosition.currentHex,
                        fixPosition.expectedHex,
                        fixPosition.startIndex
                    )
                }
                if (decl.raws.value) {
                    if (decl.raws.value.stylus) {
                        decl.raws.value.stylus = fixedDeclValue
                    } else {
                        decl.raws.value.raw = fixedDeclValue
                    }
                } else {
                    decl.value = fixedDeclValue
                }
            }
        }
    }
}

function replaceHex(input, searchString, replaceString, offset) {
    const stringStart = input.slice(0, offset)
    const stringEnd = input.slice(offset + searchString.length)

    return stringStart + replaceString + stringEnd
}

function getUrlRanges(value) {
    const results = []

    const valueScopedTokens = [...scopedTokens(value)].filter(
        ({ token }) => !isSkipToken(token)
    )

    let scopedToken = valueScopedTokens.shift()
    while (scopedToken) {
        if (scopedToken.token.value.toLowerCase() === "url") {
            const next = valueScopedTokens.shift()
            const scope = scopedToken.scope
            if (next.token.value === "(") {
                // skip scope
                let urlArgsToken = null
                let lastToken = null
                while ((urlArgsToken = valueScopedTokens.shift())) {
                    if (urlArgsToken.scope.level === scope.level) {
                        valueScopedTokens.unshift(urlArgsToken)
                        break
                    }
                    lastToken = urlArgsToken
                }
                const range = [
                    scopedToken.token.range[0],
                    (lastToken && lastToken.token.range[1]) || value.length,
                ]
                results.push(range)
            } else {
                valueScopedTokens.unshift(next)
            }
        }
        scopedToken = valueScopedTokens.shift()
    }

    return results
}
