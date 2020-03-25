# stylus/inline-comment-no-empty

> disallow empty inline comments.

- :gear: This rule is included in `"stylelint-plugin-stylus/recommended"` and `"stylelint-plugin-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports empty inline comments.

## :wrench: Options

```json
{
  "stylus/inline-comment-no-empty": true
}
```

### `true`

```styl
// ✓ GOOD
// inline comment

// ✗ BAD
//
//  
```

## :couple: Related rules

- [comment-no-empty]

[comment-no-empty]: https://stylelint.io/user-guide/rules/comment-no-empty

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/lib/rules/inline-comment-no-empty.js)
- [Test source](https://github.com/ota-meshi/stylelint-plugin-stylus/blob/master/tests/lib/rules/inline-comment-no-empty.js)
