/* eslint node/no-unsupported-features/es-syntax: 0, node/no-missing-import: 0 -- ignore */
import pako from "pako"

/**
 * Deserialize a given serialized string then update this object.
 * @param {string} serializedString A serialized string.
 * @returns {object} The deserialized state.
 */
export function deserializeState(serializedString) {
    if (serializedString === "") {
        return {}
    }

    try {
        const compressedString = window.atob(serializedString)
        const uint8Arr = pako.inflate(
            Uint8Array.from(compressedString, (c) => c.charCodeAt(0)),
        )
        const jsonText = new TextDecoder().decode(uint8Arr)
        const json = JSON.parse(jsonText)

        return json || {}
    } catch (error) {
        // eslint-disable-next-line no-console -- ignore
        console.error(error)
    }

    return {}
}
