<script setup>
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import LazyMountAndUnmountOnExit from './examples/lazy-mount-and-unmount-on-exit.vue'
import LazyMount from './examples/lazy-mount.vue'
import OnExitComplete from './examples/on-exit-complete.vue'
import RootProvider from './examples/root-provider.vue'
import UnMountOnExit from './examples/unmount-on-exit.vue'
</script>

<template>
  <Story title="Collapsible">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="OnExitComplete">
      <OnExitComplete />
    </Variant>
    <Variant title="UnmountOnExit">
      <UnMountOnExit />
    </Variant>
    <Variant title="LazyMountAndUnmountOnExit">
      <LazyMountAndUnmountOnExit />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
