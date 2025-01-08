<script setup lang="ts">
import Basic from './examples/basic.vue'
import Countdown from './examples/countdown.vue'
import Events from './examples/events.vue'
import RootProvider from './examples/root-provider.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import RootProvider from './examples/root-provider.vue'
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
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
