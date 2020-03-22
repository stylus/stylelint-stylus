---
pageClass: rule-details
sidebarDepth: 0
title: stylus/declaration-colon
description: require or disallow declaration colons.
---
# stylus/declaration-colon

> require or disallow declaration colons.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `["never"]`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule require or disallow declaration colons.

## :wrench: Options

```json
{
  "stylus/declaration-colon": ["always" | "never"]
}
```

- `"always"` ... Requires one colon.
- `"never"` ... Disallows colons.

### `"always"`

```styl
a
  // ✓ GOOD
  color: red
  // ✗ BAD
  color red
```

### `"never"`

```styl
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color: red
```

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/declaration-colon.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/declaration-colon.js)
