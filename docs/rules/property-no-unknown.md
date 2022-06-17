# stylus/property-no-unknown

> disallow unknown properties.

- :gear: This rule is included in `"stylelint-plugin-stylus/recommended"` and `"stylelint-plugin-stylus/standard"`. (options: `true`)

## :book: Rule Details

This rule reports unknown properties.

## :question: Why Not Use `stylelint` Rule

The [property-no-unknown] rule incorrectly report errors in Stylus.  
This problem is that the core rules do not understand that variables and interpolations of the Stylus.  
The `stylus/property-no-unknown` rule understands that variables and interpolations of the Stylus.

## :wrench: Options

See [stylelint - property-no-unknown - Options](https://stylelint.io/user-guide/rules/property-no-unknown#options).

## :books: Further reading

- [Stylus - VARIABLES]
- [Stylus - INTERPOLATION]

## :couple: Related rules

- [property-no-unknown]

[property-no-unknown]: https://stylelint.io/user-guide/rules/property-no-unknown
[Stylus - VARIABLES]: https://stylus-lang.com/docs/variables.html
[Stylus - INTERPOLATION]: https://stylus-lang.com/docs/interpolation.html

## :mag: Implementation

- [Rule source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/lib/rules/property-no-unknown.js)
- [Test source](https://github.com/stylus/stylelint-plugin-stylus/blob/main/tests/lib/rules/property-no-unknown.js)
