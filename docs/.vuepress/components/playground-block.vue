<template>
    <stylelint-code-block
        fix
        :extends="[
            'stylelint-config-standard',
            'stylelint-plugin-stylus/standard',
        ]"
    >
        {{ code }}
    </stylelint-code-block>
</template>

<script>
import StylelintCodeBlock from "./stylelint-code-block.vue"

const CODE_DEFAULT = `
// Try Stylus!
body {
  font: 14px/1.5 Helvetica, arial, sans-serif;
  #logo {
    border-radius: 5px;
  }
}

// Flexible syntax
body
  font 14px/1.5 Helvetica, arial, sans-serif
  button
  button.button
  input[type='button']
  input[type='submit']
    border-radius 5px

// Mixins
border-radius(val)
  -webkit-border-radius: val
  -moz-border-radius: val
  border-radius: val
  
button {
  border-radius(5px);
}
`
export default {
    name: "PlaygroundBlock",
    components: { StylelintCodeBlock },
    data() {
        return {
            code: CODE_DEFAULT,
        }
    },
}
</script>
