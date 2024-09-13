<script setup lang="ts">
import Basic from './examples/basic.vue'
import Countdown from './examples/countdown.vue'
import Events from './examples/events.vue'
</script>

<template>
  <Story title="Timer">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Countdown">
      <Countdown />
    </Variant>
    <Variant title="Events">
      <Events />
    </Variant>
  </Story>
</template>
