<script setup lang="ts">
import Action from './examples/action.vue'
import Basic from './examples/basic.vue'
import Update from './examples/update.vue'
</script>

<template>
  <Story title="Toast">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Action">
      <Action />
    </Variant>
    <Variant title="Update">
      <Update />
    </Variant>
  </Story>
</template>
