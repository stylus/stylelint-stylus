/* eslint node/no-unsupported-features/es-syntax: 0 -- ignore */
export async function loadStylelint4b() {
    const stylelint4b = import("stylelint4b")
    const alias = await import("stylelint4b/alias")

    await alias.defineAliases({
        // configs
        [require.resolve("stylelint-config-html")]: import(
            "stylelint-config-html"
        ).then((o) => ({ ...o })),
        "stylelint-config-html": import("stylelint-config-html"),
        [require.resolve("stylelint-config-html/html")]: import(
            "stylelint-config-html/html"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-config-html/vue")]: import(
            "stylelint-config-html/vue"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-config-html/php")]: import(
            "stylelint-config-html/php"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-config-html/svelte")]: import(
            "stylelint-config-html/svelte"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-config-html/astro")]: import(
            "stylelint-config-html/astro"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-config-html/xml")]: import(
            "stylelint-config-html/xml"
        ).then((o) => ({ ...o })),
        //
        [require.resolve("stylelint-stylus/base-config")]: import(
            "stylelint-stylus/base-config"
        ).then((o) => ({ ...o })),
        ["stylelint-stylus/base-config"]: import(
            "stylelint-stylus/base-config"
        ).then((o) => ({ ...o })),
        [require.resolve("stylelint-stylus/recommended")]: import(
            "stylelint-stylus/recommended"
        ).then((o) => ({ ...o })),
        ["stylelint-stylus/recommended"]: import(
            "stylelint-stylus/recommended"
        ).then((o) => ({ ...o })),
        "stylelint-stylus/standard": import("stylelint-stylus/standard").then(
            (o) => ({ ...o }),
        ),
        // plugins
        "stylelint-stylus": import("stylelint-stylus"),
        [require.resolve("stylelint-stylus")]: import("stylelint-stylus").then(
            (o) => ({ ...o }),
        ),
        // syntax
        "postcss-styl": import("postcss-styl").then((o) => ({ ...o })),
    })

    return {
        stylelint4b: await stylelint4b,
        alias,
    }
}
