<script setup lang="ts">
import Basic from './examples/basic.vue'
import Avatar from './examples/closed.vue'
import Events from './examples/events.vue'
import RootProvider from './examples/root-provider.vue'
</script>

<template>
  <Story id="avatar" title="Avatar">
    <Variant id="basic" title="Basic">
      <Basic />
    </Variant>
    <Variant id="events" title="Events">
      <Events />
    </Variant>
    <Variant id="closed" title="Closed">
      <Avatar
        name="Christian"
        src="https://avatars.githubusercontent.com/u/1846056?v=4"
        @status-change="(e) => console.log(e.status)"
      />
    </Variant>
    <Variant id="root-provider" title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
