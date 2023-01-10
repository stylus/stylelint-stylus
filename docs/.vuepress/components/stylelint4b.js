/* eslint node/no-unsupported-features/es-syntax: 0 -- ignore */
export async function loadStylelint4b() {
    const stylelint4b = import("stylelint4b")
    const alias = await import("stylelint4b/alias")

    await alias.defineAliases({
        // configs
        [require.resolve("stylelint-config-html")]: import(
            "stylelint-config-html"
        ).then((o) => adjustConfig(o)),
        "stylelint-config-html": import("stylelint-config-html"),
        [require.resolve("stylelint-config-html/html")]: import(
            "stylelint-config-html/html"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-config-html/vue")]: import(
            "stylelint-config-html/vue"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-config-html/php")]: import(
            "stylelint-config-html/php"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-config-html/svelte")]: import(
            "stylelint-config-html/svelte"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-config-html/astro")]: import(
            "stylelint-config-html/astro"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-config-html/xml")]: import(
            "stylelint-config-html/xml"
        ).then((o) => adjustConfig(o)),
        //
        [require.resolve("stylelint-stylus/base-config")]: import(
            "stylelint-stylus/base-config"
        ).then((o) => adjustConfig(o)),
        ["stylelint-stylus/base-config"]: import(
            "stylelint-stylus/base-config"
        ).then((o) => adjustConfig(o)),
        [require.resolve("stylelint-stylus/recommended")]: import(
            "stylelint-stylus/recommended"
        ).then((o) => adjustConfig(o)),
        ["stylelint-stylus/recommended"]: import(
            "stylelint-stylus/recommended"
        ).then((o) => adjustConfig(o)),
        "stylelint-stylus/standard": import("stylelint-stylus/standard").then(
            (o) => adjustConfig(o),
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

    function adjustConfig({ ...config }) {
        if (config.extends) {
            config.extends = [config.extends]
                .flat()
                .map((e) => (typeof e === "number" ? String(e) : e))
        }
        if (config.plugins) {
            config.plugins = [config.plugins]
                .flat()
                .map((e) => (typeof e === "number" ? String(e) : e))
        }
        if (config.overrides) {
            config.overrides = [config.overrides]
                .flat()
                .map((o) => adjustConfig(o))
        }
        return config
    }
}
