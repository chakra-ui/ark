<script setup lang="ts">
import Basic from './examples/basic.vue'
import WithCheckbox from './examples/with-checkbox.vue'
import WithField from './examples/with-field.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Fieldset">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="WithField">
      <WithField />
    </Variant>
    <Variant title="WithCheckbox">
      <WithCheckbox />
    </Variant>
  </Story>
</template>
