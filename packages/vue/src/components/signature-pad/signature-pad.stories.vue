<script setup lang="ts">
import Basic from './examples/basic.vue'
import ImagePreview from './examples/image-preview.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Signature Pad">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Image Preview">
      <ImagePreview />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
  </Story>
</template>
