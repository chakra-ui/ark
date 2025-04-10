<script setup lang="ts">
import Basic from './examples/basic.vue'
import Disabled from './examples/disabled.vue'
import InitialValue from './examples/initial-value.vue'
import OnEvent from './examples/on-event.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="RadioGroup">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="OnEvent">
      <OnEvent />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
