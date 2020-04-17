import pako from "pako"

/**
 * Serialize a given state as a base64 string.
 * @param {State} state The state to serialize.
 * @returns {string} The serialized string.
 */
export function serializeState(saveData) {
    const jsonString = JSON.stringify(saveData)
    const compressedString = pako.deflate(jsonString, { to: "string" })
    const base64 =
        (typeof window !== "undefined" && window.btoa(compressedString)) ||
        compressedString

    //eslint-disable-next-line no-console
    console.log(
        `The compress rate of serialized string: ${(
            (100 * base64.length) /
            jsonString.length
        ).toFixed(1)}% (${jsonString.length}B → ${base64.length}B)`,
    )

    return base64
}
