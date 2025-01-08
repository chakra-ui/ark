<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="ColorPicker">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
