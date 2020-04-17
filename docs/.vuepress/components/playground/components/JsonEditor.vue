<template>
    <div :class="{ 'json-editor-dark': dark }" class="json-editor-root">
        <transition name="json-editor-fade" @before-enter="fadeIn">
            <div v-if="monaco" key="editor" class="json-editor-swap-container">
                <div ref="monaco" class="json-editor-monaco" />
            </div>
            <div v-else key="placeholder" class="json-editor-swap-container">
                <code class="json-editor-placeholder-code">{{ code }}</code>
                <transition name="json-editor-fade">
                    <div
                        v-if="monacoLoadingError"
                        key="error"
                        class="json-editor-placeholder-error"
                    >
                        Failed to load this editor
                    </div>
                    <div
                        v-else
                        key="loading"
                        class="json-editor-placeholder-loading"
                    >
                        <div class="json-editor-placeholder-loading-icon">
                            <div />
                            <div />
                            <div />
                        </div>
                        <div class="json-editor-placeholder-loading-message">
                            Now loading...
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
const EDITOR_OPTS = {
    autoIndent: true,
    automaticLayout: true,
    find: {
        autoFindInSelection: true,
        seedSearchStringFromSelection: true,
    },
    minimap: { enabled: false },
    renderControlCharacters: true,
    renderIndentGuides: true,
    renderValidationDecorations: "on",
    renderWhitespace: "boundary",
    scrollBeyondLastLine: false,
}

/**
 * Update the value of a given editor.
 * @param {monaco.editor.IStandaloneEditor} editor The editor to update.
 * @param {string} value The new value.
 * @returns {void}
 */
function updateValue(editor, value) {
    const model = editor.getModel()
    if (model != null && value !== model.getValue()) {
        model.setValue(value)
    }
}

/**
 * Dispose.
 * @param {any} x The target object.
 * @returns {void}
 */
function dispose(x) {
    if (x == null) {
        return
    }

    if (x.getOriginalEditor) {
        dispose(x.getOriginalEditor())
    }
    if (x.getModifiedEditor) {
        dispose(x.getModifiedEditor())
    }
    if (x.getModel) {
        dispose(x.getModel())
    }
    if (x.dispose) {
        x.dispose()
    }
}

export default {
    name: "JsonEditor",

    model: {
        prop: "code",
        event: "input",
    },

    props: {
        code: {
            type: String,
            default: "",
        },
        dark: {
            type: Boolean,
        },
        format: {
            type: Object,
            default() {
                return { insertSpaces: true, tabSize: 4 }
            },
        },
    },

    data() {
        return {
            monaco: null,
            monacoLoadingError: null,
            editor: null,
        }
    },

    watch: {
        code(value) {
            this.updateCode(value)
        },
        format(value) {
            const editor = this.editor
            if (editor != null) {
                editor.getModel().updateOptions(value)
            }
        },
    },

    mounted() {
        ;(async () => {
            // Load the monaco editor lazily.
            const { monaco, loadLanguage } = await import(
                // eslint-disable-next-line @mysticatea/node/no-extraneous-import
                "vue-eslint-editor/dist/monaco"
            )
            // Load the language editor of the current language.
            await loadLanguage("json")
            // Finish loading.
            this.monaco = monaco
            this.loadLanguage = loadLanguage
        })().catch(error => {
            console.error("Failed to load Monaco editor:", error)
            this.monacoLoadingError = error
        })
    },

    beforeDestroy() {
        dispose(this.editor)
        this.$refs.monaco.innerHTML = ""
        this.editor = null
    },

    methods: {
        fadeIn(el) {
            if (this.$refs.monaco && this.$refs.monaco.parentNode === el) {
                this.initialize()
            }
        },

        initialize() {
            if (this.monaco != null) {
                dispose(this.editor)
                this.$refs.monaco.innerHTML = ""
                this.editor = this.createEditor()
            }
        },

        createEditor() {
            const { code, dark, format, monaco } = this

            // Create model.
            const model = monaco.editor.createModel(code, "json")
            model.updateOptions(format)
            model.onDidChangeContent(() => {
                this.$emit("input", model.getValue())
            })

            // Create editor.
            const editor = monaco.editor.create(this.$refs.monaco, {
                model,
                theme: dark ? "vs-dark" : "vs",
                ...EDITOR_OPTS,
            })

            return editor
        },

        updateCode(value) {
            const editor = this.editor
            if (editor != null) {
                updateValue(editor, value)
            }
        },
    },
}
</script>

<style>
.json-editor-root {
    position: relative;
}

.json-editor-swap-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.json-editor-monaco {
    width: 100%;
    height: 100%;
}

.json-editor-root .json-editor-placeholder-code {
    display: block;
    box-sizing: border-box;
    height: 100%;
    white-space: pre;
    background-color: #fff;
    color: #1e1e1e;
}

.json-editor-root.json-editor-dark .json-editor-placeholder-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.json-editor-placeholder-loading,
.json-editor-placeholder-error {
    position: absolute;
    right: 8px;
    bottom: 8px;
    pointer-events: none;
}

.json-editor-placeholder-loading {
    line-height: 1.5em;
}

.json-editor-placeholder-error {
    color: #f44336;
}

.json-editor-placeholder-loading-icon {
    display: inline-block;
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;
    vertical-align: middle;
}

.json-editor-placeholder-loading-icon > div {
    position: absolute;
    border-radius: 50%;
    border-color: #3eaf7c;
    border-width: 2px;
    border-style: none solid none solid;
    animation: VueStylelintEditorLoadingIcon 1s linear infinite;
}

.json-editor-placeholder-loading-icon > div:nth-child(1) {
    height: 100%;
    width: 100%;
    animation-duration: 1.3s;
}

.json-editor-placeholder-loading-icon > div:nth-child(2) {
    top: 1px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 2px);
    animation-duration: 0.7s;
}

.json-editor-placeholder-loading-icon > div:nth-child(3) {
    top: 2px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 4px);
    animation-duration: 1s;
}

.json-editor-placeholder-loading-message {
    display: inline-block;
    color: gray;
    vertical-align: middle;
}

@keyframes VueStylelintEditorLoadingIcon {
    0% {
        transform: rotateY(0deg);
    }

    50% {
        transform: rotateY(210deg);
    }

    100% {
        transform: rotateY(360deg);
    }
}

.json-editor-fade-enter-active,
.json-editor-fade-leave-active {
    transition: opacity 0.3s ease;
}

.json-editor-fade-enter,
.json-editor-fade-leave-to {
    opacity: 0;
}
</style>
