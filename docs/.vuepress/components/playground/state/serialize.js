/* eslint node/no-unsupported-features/es-syntax: 0, node/no-missing-import: 0 -- ignore */
import pako from "pako"

/**
 * Serialize a given state as a base64 string.
 * @param {State} state The state to serialize.
 * @returns {string} The serialized string.
 */
export function serializeState(saveData) {
    const jsonString = JSON.stringify(saveData)
    const uint8Arr = new TextEncoder().encode(jsonString)
    const compressedString = String.fromCharCode(...pako.deflate(uint8Arr))
    const base64 =
        (typeof window !== "undefined" && window.btoa(compressedString)) ||
        compressedString

    // eslint-disable-next-line no-console -- ignore
    console.log(
        `The compress rate of serialized string: ${(
            (100 * base64.length) /
            jsonString.length
        ).toFixed(1)}% (${jsonString.length}B → ${base64.length}B)`,
    )

    return base64
}
