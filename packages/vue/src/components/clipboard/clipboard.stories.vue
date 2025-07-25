<script setup lang="ts">
import Basic from './examples/basic.vue'
import Context from './examples/context.vue'
import Controlled from './examples/controlled.vue'
import CopyStatus from './examples/copy-status.vue'
import CustomTimeout from './examples/custom-timeout.vue'
import Programmatic from './examples/programmatic.vue'
import RootProvider from './examples/root-provider.vue'
import ValueText from './examples/value-text.vue'
</script>
<template>
  <Story title="Clipboard">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="CopyStatus">
      <CopyStatus />
    </Variant>
    <Variant title="CustomTimeout">
      <CustomTimeout />
    </Variant>
    <Variant title="Programmatic">
      <Programmatic />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="ValueText">
      <ValueText />
    </Variant>
  </Story>
</template>
