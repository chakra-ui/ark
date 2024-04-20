<script setup lang="ts">
import Basic from './examples/basic.vue'
import LazyMountAndUnmountOnExit from './examples/lazy-mount-and-unmount-on-exit.vue'
import LazyMount from './examples/lazy-mount.vue'
import UnmountOnExit from './examples/unmount-on-exit.vue'
</script>
<template>
<Story title="Presence">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="UnmountOnExit">
      <UnmountOnExit />
    </Variant>
    <Variant title="LazyMountAndUnmountOnExit">
      <LazyMountAndUnmountOnExit />
    </Variant>
</Story>
</template>
