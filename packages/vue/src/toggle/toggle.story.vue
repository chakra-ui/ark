<script setup lang="ts">
import { Toggle } from '.'
</script>
<template>
  <Story title="Toggle">
    <Variant title="Basic">
      <Toggle @change="(x) => console.log(x)">B</Toggle>
    </Variant>
  </Story>
</template>
