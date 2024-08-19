<script setup lang="ts">
import Basic from './examples/basic.vue'
import Countdown from './examples/countdown.vue'
</script>

<template>
  <Story title="Timer">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Countdown">
      <Countdown />
    </Variant>
  </Story>
</template>
