module.exports = {
    parserOptions: {
        sourceType: 'module'
    },
    globals:{
        window: true,
        require: true
    },
    rules: {
        "@mysticatea/node/no-unsupported-features/es-syntax": 'off'
    }
}