<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import CustomControls from './examples/custom-controls.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Editable">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="CustomControls">
      <CustomControls />
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
