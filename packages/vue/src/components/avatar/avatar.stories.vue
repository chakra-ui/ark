<script setup lang="ts">
import Basic from './examples/basic.vue'
import Avatar from './examples/closed.vue'
import Events from './examples/events.vue'
import RootProvider from './examples/root-provider.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Avatar">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Events">
      <Events />
    </Variant>
    <Variant title="Closed">
      <Avatar
        name="Christian"
        src="https://avatars.githubusercontent.com/u/1846056?v=4"
        @status-change="(e) => console.log(e.status)"
      />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
