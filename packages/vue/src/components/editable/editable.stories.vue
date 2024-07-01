<script setup lang="ts">
import Basic from './examples/basic.vue'
import CustomControls from './examples/custom-controls.vue'
</script>
<template>
  <Story title="Editable">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="CustomControls">
      <CustomControls />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
  </Story>
</template>
