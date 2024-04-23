<script setup lang="ts">
import Basic from './examples/basic.vue'
import Closed from './examples/closed.vue'
</script>
<template>
  <Story title="Avatar SFC">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <!-- <Variant title="Events">
      <Events />
    </Variant> -->
    <Variant title="Closed">
      <Closed name="Christian" @status-change="e => console.log(e.status)"  />
    </Variant>
  </Story>
</template>
