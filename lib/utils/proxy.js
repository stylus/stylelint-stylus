"use strict"

const ORIGINAL = Symbol("ORIGINAL")

module.exports = {
    transformResult,
    newProxy,
}

function transformResult(result, { originalRuleName, ruleName, filter }) {
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
                const newText = text.replace(
                    `(${originalRuleName})`,
                    `(${ruleName})`
                )
                const newOpts = {
                    ...opts,
                    rule: ruleName,
                }
                if (filter && !filter(newText, newOpts)) {
                    // ignore
                    return
                }
                result.warn(newText, newOpts)
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

function newProxy(target, wrapper) {
    if (target == null) {
        return target
    }
    return new Proxy(target, {
        get(_target, name) {
            if (name === ORIGINAL) {
                return target
            }
            return Object.prototype.hasOwnProperty.call(wrapper, name)
                ? wrapper[name]
                : target[name]
        },
        set(_target, name, value) {
            const applyValue = (value && value[ORIGINAL]) || value
            const propertyDescriptor = Object.getOwnPropertyDescriptor(
                wrapper,
                name
            )
            if (
                propertyDescriptor &&
                typeof propertyDescriptor.set === "function"
            ) {
                wrapper[name] = applyValue
            } else {
                target[name] = applyValue
            }
            return true
        },
    })
}
