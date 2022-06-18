"use strict"

module.exports = {
    extends: ["stylelint-stylus/base-config"],
    rules: {
        "stylus/selector-type-no-unknown": [true, {ignore: ["custom-elements"]}],
    },
}
