<script setup lang="ts">
import Basic from './examples/basic.vue'
import WithSvg from './examples/svg.vue'
import WithPromise from './examples/with-promise.vue'
</script>
<template>
  <Story title="DownloadTrigger">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Svg">
      <WithSvg />
    </Variant>
    <Variant title="With Promise">
      <WithPromise />
    </Variant>
  </Story>
</template>
