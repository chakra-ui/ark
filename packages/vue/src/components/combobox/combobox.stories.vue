<script setup lang="ts">
import Advanced from './examples/advanced.vue'
import Basic from './examples/basic.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Combobox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Advanced">
      <Advanced />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
