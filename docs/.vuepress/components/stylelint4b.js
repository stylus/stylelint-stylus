/* eslint node/no-unsupported-features/es-syntax: 0 -- ignore */
export async function loadStylelint4b() {
    const stylelint4b = import("stylelint4b")
    const alias = await import("stylelint4b/alias")

    await alias.defineAliases({
        // configs
        [require.resolve("stylelint-config-html")]: import(
            "stylelint-config-html"
        ),
        "stylelint-config-html": import("stylelint-config-html"),
        [require.resolve("stylelint-config-html/html")]: import(
            "stylelint-config-html/html"
        ),
        [require.resolve("stylelint-config-html/vue")]: import(
            "stylelint-config-html/vue"
        ),
        [require.resolve("stylelint-config-html/php")]: import(
            "stylelint-config-html/php"
        ),
        [require.resolve("stylelint-config-html/svelte")]: import(
            "stylelint-config-html/svelte"
        ),
        [require.resolve("stylelint-config-html/xml")]: import(
            "stylelint-config-html/xml"
        ),
        //
        [require.resolve("stylelint-plugin-stylus/base-config")]: import(
            "stylelint-plugin-stylus/base-config"
        ),
        ["stylelint-plugin-stylus/base-config"]: import(
            "stylelint-plugin-stylus/base-config"
        ),
        [require.resolve("stylelint-plugin-stylus/recommended")]: import(
            "stylelint-plugin-stylus/recommended"
        ),
        ["stylelint-plugin-stylus/recommended"]: import(
            "stylelint-plugin-stylus/recommended"
        ),
        "stylelint-plugin-stylus/standard": import(
            "stylelint-plugin-stylus/standard"
        ),
        // plugins
        "stylelint-plugin-stylus": import("stylelint-plugin-stylus"),
        [require.resolve("stylelint-plugin-stylus")]: import(
            "stylelint-plugin-stylus"
        ),
        // syntax
        "postcss-styl": import("postcss-styl"),
    })

    return {
        stylelint4b: await stylelint4b,
        alias,
    }
}
