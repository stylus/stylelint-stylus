<template>
    <stylelint-editor
        ref="editor"
        class="stylelint-code-block"
        :stylelint="stylelint"
        :code="code"
        :style="{ height }"
        :config="config"
        :options="options"
        dark
        :fix="fix"
        :format="format"
        language="stylus"
        filename="a.styl"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
    />
</template>

<script>
import StylelintEditor from "vue-stylelint-editor"

export default {
    name: "StylelintCodeBlock",
    components: { StylelintEditor },
    props: {
        fix: {
            type: Boolean,
        },
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
        extends: {
            type: Array,
            default() {
                return []
            },
        },
    },

    data() {
        return {
            stylelint4b: null,
            alias: null,
            format: {
                insertSpaces: true,
                tabSize: 2,
            },
            options: {},
        }
    },
    computed: {
        code() {
            return `${this.computeCodeFromSlot(this.$slots.default).trim()}\n`
        },

        height() {
            const lines = this.code.split("\n").length
            return `${Math.max(120, 20 * (1 + lines))}px`
        },
        stylelint() {
            if (!this.stylelint4b) {
                return null
            }

            return this.stylelint4b
        },
        config() {
            const alias = this.alias
            if (!alias) {
                return {}
            }

            return {
                plugins: ["stylelint-plugin-stylus"],
                extends: this.extends,
                rules: this.rules,
            }
        },
    },

    mounted() {
        // Load linter asynchronously.
        this.loadStylelint4b()
        this.loadConfig()
    },
    methods: {
        async loadStylelint4b() {
            const stylelint4b = import("stylelint4b")
            const alias = await import("stylelint4b/alias")

            await alias.defineAliases({
                "./node_modules/stylelint-plugin-stylus/recommended/index.js": import(
                    "stylelint-plugin-stylus/recommended"
                ),
                "stylelint-plugin-stylus/standard": import(
                    "stylelint-plugin-stylus/standard"
                ),
                "stylelint-plugin-stylus": import("stylelint-plugin-stylus"),
                "./node_modules/stylelint-plugin-stylus/lib/index.js": import(
                    "stylelint-plugin-stylus"
                ),
                "stylelint-plugin-stylus/custom-syntax": import(
                    "stylelint-plugin-stylus/custom-syntax"
                ),
            })

            this.stylelint4b = await stylelint4b
            this.alias = alias
        },
        loadConfig() {
            this.options = {
                customSyntax: "stylelint-plugin-stylus/custom-syntax",
            }
        },
        /**
         * @param {VNode[]} nodes
         * @returns {string}
         */
        computeCodeFromSlot(nodes) {
            if (!Array.isArray(nodes)) {
                return ""
            }
            return nodes
                .map(
                    node => node.text || this.computeCodeFromSlot(node.children)
                )
                .join("")
        },
    },
}
</script>
<style scoped>
.stylelint-code-block {
    width: 100%;
    margin: 1em 0;
}
</style>
