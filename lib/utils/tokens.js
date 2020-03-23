"use strict"

const Tokenizer = require("postcss-styl/lib/parser/tokenizer")

const KIND_BRACKET = 1
const KIND_BRACE = 2
const KIND_PAREN = 3

const LEFT_PAREN_KINDS = {
    "(": KIND_PAREN,
    "{": KIND_BRACE,
    "[": KIND_BRACKET,
}

const RIGHT_PAREN_KINDS = {
    ")": KIND_PAREN,
    "}": KIND_BRACE,
    "]": KIND_BRACKET,
}

module.exports = {
    tokens,
    scopedTokens,
    isSkipToken,
}

function* tokens(text) {
    yield* new Tokenizer(text).tokens()
}

function* scopedTokens(text) {
    let scope = {
        level: 0,
        parenKind: "",
    }
    for (const token of tokens(text)) {
        if (RIGHT_PAREN_KINDS[token.value] === scope.parenKind) {
            scope = scope.parent
        } else if (LEFT_PAREN_KINDS[token.value]) {
            scope = {
                parent: scope,
                level: scope.level + 1,
                parenKind: LEFT_PAREN_KINDS[token.value],
            }
        }
        yield {
            token,
            scope,
        }
    }
}

function isSkipToken(token) {
    return (
        token.type === "whitespace" ||
        token.type === "linebreak" ||
        token.type === "comment" ||
        token.type === "inline-comment"
    )
}
