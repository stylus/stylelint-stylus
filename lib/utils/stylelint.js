"use strict"

module.exports = {
    loadCoreRule,
}

async function loadCoreRule(name) {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax -- ignore
    const stylelint = await import("stylelint").then(
        (mod) => mod.default || mod,
    )
    const rule = stylelint.rules?.[name]
    if (rule) {
        return rule
    }
    return require(`stylelint/lib/rules/${name}`)
}
