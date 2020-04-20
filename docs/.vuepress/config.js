const {
    categories,
    uncategorizedRules,
    deprecatedRules,
} = require("../../scripts/lib/categories")

const path = require("path")
// eslint-disable-next-line @mysticatea/node/no-extraneous-require
const webpack = require("webpack")

function resolve(seg) {
    return path.resolve(__dirname, seg)
}

const extraCategories = []
if (uncategorizedRules.length > 0) {
    extraCategories.push({
        title: "Uncategorized",
        collapsable: false,
        children: uncategorizedRules.map(({ ruleName, fileName }) => [
            `/rules/${fileName}`,
            ruleName,
        ]),
    })
}
if (deprecatedRules.length > 0) {
    extraCategories.push({
        title: "Deprecated",
        collapsable: false,
        children: deprecatedRules.map(({ ruleName, fileName }) => [
            `/rules/${fileName}`,
            ruleName,
        ]),
    })
}

module.exports = {
    base: "/stylelint-plugin-stylus/",
    title: "stylelint-plugin-stylus",
    description: "stylelint-plugin-stylus",
    serviceWorker: true,
    head: [
        // ["link", { rel: "icon", type: "image/png", href: "/logo.png" }]
    ],
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                // eslint-disable-next-line @mysticatea/node/no-extraneous-require
                stylus: require.resolve("stylus/lib/stylus"),
                glob: require.resolve("./shim/glob"),
                sax: require.resolve("./shim/sax"),
                stylelint: resolve("../../node_modules/stylelint4b"),
                "postcss-syntax": resolve(
                    "../../node_modules/stylelint4b/packages/postcss-syntax"
                ),
                postcss: resolve(
                    "../../node_modules/stylelint4b/packages/postcss"
                ),
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.version": JSON.stringify("v12.13.0"),
                "process.env": "{}",
                "process.platform": '"darwin"',
            }),
        ],
    },
    themeConfig: {
        repo: "ota-meshi/stylelint-plugin-stylus",
        docsRepo: "ota-meshi/stylelint-plugin-stylus",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,
        lastUpdated: true,

        nav: [
            { text: "Introduction", link: "/" },
            { text: "Playground", link: "/playground/" },
        ],

        sidebar: {
            "/": [
                "/",
                "/playground/",

                // Rules in each category.
                ...categories
                    .map(({ title, rules: catRules }) => ({
                        title: title.replace(/ \(.+?\)/u, ""),
                        collapsable: false,
                        children: catRules.map(({ ruleName, fileName }) => [
                            `/rules/${fileName}`,
                            ruleName,
                        ]),
                    }))
                    .filter(menu => Boolean(menu.children.length)),

                // Rules in no category.
                ...extraCategories,
            ],
        },
    },
}
