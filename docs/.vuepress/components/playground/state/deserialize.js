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
        // For backward compatibility, it can address non-compressed data.
        const compressed = !serializedString.startsWith("eyJj")
        const decodedText = window.atob(serializedString)
        const jsonText = compressed
            ? pako.inflate(decodedText, { to: "string" })
            : decodedText
        const json = JSON.parse(jsonText)

        return json || {}
    } catch (error) {
        console.error(error)
    }

    return {}
}
