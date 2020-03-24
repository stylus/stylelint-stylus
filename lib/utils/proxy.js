"use strict"

const ORIGINAL = Symbol("ORIGINAL")

module.exports = {
    transformResult,
    newProxy,
}

function transformResult(result, { originalRuleName, ruleName }) {
    let stylelintProxy = null
    let disabledRanges = null
    let ruleSeverities = null
    let customMessages = null
    return newProxy(result, {
        get stylelint() {
            return getStylelintProxy()
        },
        warn(text, opts) {
            if (opts && opts.rule === originalRuleName) {
                result.warn(text.replace(originalRuleName, ruleName), {
                    ...opts,
                    rule: ruleName,
                })
            } else {
                result.warn(text, opts)
            }
        },
    })

    function getStylelintProxy() {
        return (
            stylelintProxy ||
            (stylelintProxy = newProxy(result.stylelint, {
                get disabledRanges() {
                    return (
                        disabledRanges ||
                        (disabledRanges = transformRule(
                            result.stylelint.disabledRanges
                        ))
                    )
                },
                get ruleSeverities() {
                    return (
                        ruleSeverities ||
                        (ruleSeverities = transformRule(
                            result.stylelint.ruleSeverities
                        ))
                    )
                },
                get customMessages() {
                    return (
                        customMessages ||
                        (customMessages = transformRule(
                            result.stylelint.customMessages
                        ))
                    )
                },
            }))
        )
    }

    function transformRule(target) {
        return newProxy(target, {
            get [originalRuleName]() {
                return target[ruleName]
            },
        })
    }
}

function newProxy(target, obj) {
    if (target == null) {
        return target
    }
    return new Proxy(target, {
        get(_target, name) {
            if (name === ORIGINAL) {
                return target
            }
            return name in obj ? obj[name] : target[name]
        },
        set(_target, name, value) {
            const original = value && value[ORIGINAL]
            target[name] = original || value
            return true
        },
    })
}
