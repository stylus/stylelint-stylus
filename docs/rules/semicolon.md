---
pageClass: rule-details
sidebarDepth: 0
title: stylus/semicolon
description: requires or disallows semicolon.
---
# stylus/semicolon

> requires or disallows semicolon.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `["never"]`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule requires or disallows semicolons.

## :wrench: Options

```json
{
  "stylus/semicolon": ["always" | "never"]
}
```

- `"always"` ... Requires semicolon.
- `"never"` ... Disallows semicolons.

### `"always"`

```styl
a
  // ✓ GOOD
  color red;
  // ✗ BAD
  color red
```

### `"never"`

```styl
a
  // ✓ GOOD
  color red
  // ✗ BAD
  color red;
```

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/semicolon.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/semicolon.js)
