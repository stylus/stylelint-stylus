"use strict"

module.exports = {
    extends: ["stylelint-config-standard", "stylelint-stylus/standard"],
    rules: {
        "no-missing-end-of-source-newline": true,
        'string-quotes': 'double',
		'declaration-colon-space-after': 'always-single-line',
    }
}
