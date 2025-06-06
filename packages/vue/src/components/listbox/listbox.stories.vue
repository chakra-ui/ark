<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import Group from './examples/group.vue'
import Multiple from './examples/multiple.vue'
import RootProvider from './examples/root-provider.vue'
import ValueText from './examples/value-text.vue'
</script>

<template>
  <Story title="Listbox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Group">
      <Group />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="ValueText">
      <ValueText />
    </Variant>
  </Story>
</template>
