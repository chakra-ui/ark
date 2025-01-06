<script setup lang="ts">
import Basic from './examples/basic.vue'
import ErrorCorrection from './examples/error-correction.vue'
import RootProvider from './examples/root-provider.vue'
import WithOverlay from './examples/with-overlay.vue'
</script>
<template>
  <Story title="QR Code">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="WithOverlay">
      <WithOverlay />
    </Variant>
    <Variant title="ErrorCorrection">
      <ErrorCorrection />
    </Variant>
  </Story>
</template>
