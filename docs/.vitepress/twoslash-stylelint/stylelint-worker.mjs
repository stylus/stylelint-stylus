import { runAsWorker } from "synckit"

runAsWorker(lint)

async function lint(options) {
    const stylelint = await import("stylelint").then((m) => m.default || m)
    const result = await stylelint.lint(options)
    // Returns only cloneable values for subsequent use.
    return {
        results: result.results.map((r) => {
            return {
                warnings: r.warnings,
            }
        }),
        ruleMetadata: result.ruleMetadata,
    }
}
