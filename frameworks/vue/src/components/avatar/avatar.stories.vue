<script setup>
import Basic from './examples/basic.vue'
import Closed from './examples/closed.vue'
import Context from './examples/context.vue'
import Events from './examples/events.vue'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Events">
      <Events />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Closed">
      <Closed @status-change="e => console.log(e.status)" name="Christian Schröter" src="https://avatars.githubusercontent.com/u/1846056?v=4" />
    </Variant>
  </Story> 
</template>