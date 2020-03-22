---
pageClass: rule-details
sidebarDepth: 0
title: stylus/pythonic
description: enforces pythonic or brace style.
---
# stylus/pythonic

> enforces pythonic or brace style.

- :gear: This rule is included in `"stylelint-plugin-stylus/standard"`. (options: `["always"]`)
- :wrench: The [fix option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces pythonic or brace style.

## :wrench: Options

```json
{
  "stylus/pythonic": ["always" | "never"]
}
```

- `"always"` ... Requires pythonic style.
- `"never"` ... Requires brace style.

### `"always"`

```styl
// ✓ GOOD
.foo
  color red;

// ✗ BAD
.foo {
  color red;
}
```

### `"never"`

```styl
// ✓ GOOD
.foo {
  color red;
}

// ✗ BAD
.foo
  color red;
```

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/pythonic.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/pythonic.js)
