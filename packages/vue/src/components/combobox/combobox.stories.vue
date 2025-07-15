<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import CustomObject from './examples/custom-object.vue'
import Dynamic from './examples/dynamic.vue'
import Grouping from './examples/grouping.vue'
import Links from './examples/links.vue'
import Multiple from './examples/multiple.vue'
import RehydrateValue from './examples/rehydrate-value.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
import WithHighlight from './examples/with-highlight.vue'
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
    <Variant title="Dynamic">
      <Dynamic />
    </Variant>
    <Variant title="Rehydrate Value">
      <RehydrateValue />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="With Highlight">
      <WithHighlight />
    </Variant>
    <Variant title="Custom Object">
      <CustomObject />
    </Variant>
  </Story>
</template>
