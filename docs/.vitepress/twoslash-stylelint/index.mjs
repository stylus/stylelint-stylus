import { fileURLToPath } from "node:url"
import * as path from "node:path"
import {
    createPositionConverter,
    resolveNodePositions,
} from "twoslash-protocol"
import { createSyncFn } from "synckit"

function createTwoslasher(options) {
    const { includeDocs = true, mergeMessages = true } = options
    const workerPath = path.join(
        fileURLToPath(import.meta.url),
        "../stylelint-worker.mjs",
    )
    const lint = createSyncFn(workerPath)
    return (code, file) => {
        const filename = file?.includes(".") ? file : `index.${file ?? "css"}`
        const linterResult = lint({
            config: options.stylelintConfig,
            codeFilename: filename,
            code: options.stylelintCodePreprocess?.(code) || code,
        })
        const result = linterResult.results[0]
        const pc = createPositionConverter(code)
        const raws = result.warnings.map((message) => {
            const start = pc.posToIndex(message.line - 1, message.column - 1)
            const end =
                message.endLine != null && message.endColumn != null
                    ? pc.posToIndex(message.endLine - 1, message.endColumn - 1)
                    : start + 1
            let text = message.text
            if (message.rule) {
                const link =
                    includeDocs &&
                    linterResult.ruleMetadata?.[message.rule]?.url
                text += link
                    ? ` ([${message.rule}](${link}))`
                    : ` (${message.rule})`
            }
            return {
                type: "error",
                id: message.rule || "",
                code: 0,
                text,
                start,
                length: end - start,
                level: message.severity,
                filename,
            }
        })
        let merged = []
        if (mergeMessages) {
            for (const current of raws) {
                const existing = merged.find(
                    (r) =>
                        r.start === current.start &&
                        r.length === current.length,
                )
                if (existing) {
                    existing.text += `

${current.text}`
                    continue
                }
                merged.push(current)
            }
        } else {
            merged = raws
        }
        const nodes = resolveNodePositions(merged, code).filter(
            (i) => i.line < pc.lines.length,
        )
        const results = {
            code,
            nodes,
        }
        return results
    }
}

export { createTwoslasher }
