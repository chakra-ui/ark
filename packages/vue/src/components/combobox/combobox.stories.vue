<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Grouping from './examples/grouping.vue'
import Links from './examples/links.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Combobox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Grouping">
      <Grouping />
    </Variant>
    <Variant title="Links">
      <Links />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
  </Story>
</template>
