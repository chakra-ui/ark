<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import Indicator from './examples/indicator.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import Indicator from './examples/indicator.vue'
</script>

<template>
  <Story title="Toggle">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Indicator">
      <Indicator />
    </Variant>
  </Story>
</template>
