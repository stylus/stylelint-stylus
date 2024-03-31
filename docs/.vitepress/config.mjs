import { defineConfig } from "vitepress"
import path from "path"
import { fileURLToPath } from "url"
import { transformerTwoslash } from "@shikijs/vitepress-twoslash"
import { createTwoslasher as createTwoslasherStylelint } from "./twoslash-stylelint/index.mjs"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function ruleToSidebarItem({ ruleName, fileName }) {
    return {
        text: ruleName,
        link: `/rules/${fileName}`,
    }
}

export default async () => {
    const categoriesPath = path.join(dirname, "../../scripts/lib/categories.js")
    const { categories, uncategorizedRules, deprecatedRules } = await import(
        categoriesPath
    ).then((m) => m.default || m)

    const extraCategories = []
    if (uncategorizedRules.length > 0) {
        extraCategories.push({
            text: "Uncategorized",
            collapsed: false,
            items: uncategorizedRules.map(ruleToSidebarItem),
        })
    }
    if (deprecatedRules.length > 0) {
        extraCategories.push({
            text: "Deprecated",
            collapsed: false,
            items: deprecatedRules.map(ruleToSidebarItem),
        })
    }

    const configExtractor = /\/\*\s*stylelint rules config:(.*?)\*\//u

    const pluginPath = path.join(dirname, "../../lib/index.js")
    return defineConfig({
        base: "/stylelint-stylus/",
        title: "stylelint-stylus",
        outDir: path.join(dirname, "./dist/stylelint-stylus"),
        description: "Stylelint plugin for Stylus",
        head: [],
        lastUpdated: true,
        markdown: {
            codeTransformers: [
                transformerTwoslash({
                    explicitTrigger: false, // Required for v-menu to work.
                    langs: ["stylus", "styl"],
                    filter(lang, code) {
                        if (
                            lang.startsWith("stylus") ||
                            lang.startsWith("styl")
                        ) {
                            return configExtractor.test(code)
                        }
                        return false
                    },
                    errorRendering: "hover",
                    twoslasher: (code, ...args) => {
                        const config = configExtractor.exec(code)[1]

                        const twoslasher = createTwoslasherStylelint({
                            stylelintConfig: {
                                plugins: [pluginPath],
                                extends: ["stylelint-config-html"],
                                overrides: [
                                    {
                                        files: [
                                            "*.stylus",
                                            "*.styl",
                                            "**/*.stylus",
                                            "**/*.styl",
                                        ],
                                        customSyntax: "postcss-styl",
                                        rules: JSON.parse(config),
                                    },
                                ],
                            },
                        })
                        return twoslasher(code, ...args)
                    },
                }),
            ],
        },
        themeConfig: {
            siteTitle: "stylelint-stylus",
            search: {
                provider: "local",
                options: {
                    detailedView: true,
                },
            },
            editLink: {
                pattern:
                    "https://github.com/stylus/stylelint-stylus/edit/main/docs/:path",
            },
            nav: [
                { text: "User Guide", link: "/" },
                {
                    text: "Playground",
                    link: "https://stylelint.io/demo/#N4Igxg9gJgpiBcID0SAEAVATgT1QZQBdsAbAVwGcBCAHQDsAjaXYO1VAMwloPlQEYALAAcAHkj4A6AKyoAEjGIA3GAQCWYAIYAaVBsyqNxHeQ21yAWnIx97ANytUAYmIQA5hFQtabNo0yxMc0wNKFUKXilRe29UAF86eNo6FFQAMWIYEVV6DNRybG4NETpGKGwHTm5+YTFJGXklFXVtXX1DY1MLKxs6B3pSAgIuPoGh2gl+weGY1VohAYBtIiEYAF5qEEmxjYBdB1n5giXsFfWQclJ6AFtVAl2HXwh-ayCQsPJUSOKk2hSAWVUWTMJSeAVeoQoAApFIYAJQOcwAdxg9AA1rdzH4wcEIeReDDiAirhAAF6Y0EvHHvfGGPoUwJU8KoAkOEqjLieOnPBlvKFfWHRRIgLQgdiqDIAOQ0VzgiEy0qEGQk5CIxGF4C4YtcCBAXjYG0yBBgtCg5A2vAWD1QGxVJAUswIllVFCQKtMUD0UA2Dj2tFi6sgtC1qSeVw0BB1ACtyFx1bAhOQdXrredVfbuOaU8RwzAVRstKzU3biA6nSQKJmNtmjXmQAkQLEgA",
                },
            ],
            socialLinks: [
                {
                    icon: "github",
                    link: "https://github.com/stylus/stylelint-stylus",
                },
            ],
            sidebar: {
                "/": [
                    {
                        text: "Guide",
                        items: [{ text: "User Guide", link: "/" }],
                    },
                    {
                        text: "Rules",
                        items: [
                            ...categories
                                .map(({ title, rules: catRules }) => ({
                                    text: title.replace(/ \(.+?\)/u, ""),
                                    collapsed: false,
                                    items: catRules.map(ruleToSidebarItem),
                                }))
                                .filter((menu) => Boolean(menu.items.length)),

                            // Rules in no category.
                            ...extraCategories,
                        ],
                    },
                ],
            },
        },
    })
}
