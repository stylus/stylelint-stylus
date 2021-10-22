"use strict"

module.exports = {
    plugins: [require.resolve("../")],
    extends: [require.resolve("stylelint-config-html")],
    overrides: [
        {
            files: ["*.stylus", "*.styl", "**/*.stylus", "**/*.styl"],
            customSyntax: "postcss-styl",
        },
    ],
}
