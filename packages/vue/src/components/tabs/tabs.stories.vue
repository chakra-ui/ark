<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import DisabledTab from './examples/disabled-tab.vue'
import Indicator from './examples/indicator.vue'
import InitialTab from './examples/initial-tab.vue'
import LazyMount from './examples/lazy-mount.vue'
import Manual from './examples/manual.vue'
import RootProvider from './examples/root-provider.vue'
import Vertical from './examples/vertical.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import Vertical from './examples/vertical.vue'
</script>
<template>
  <Story title="Tabs">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialTab">
      <InitialTab />
    </Variant>
    <Variant title="Indicator">
      <Indicator />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="DisabledTab">
      <DisabledTab />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
    <Variant title="Manual">
      <Manual />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
