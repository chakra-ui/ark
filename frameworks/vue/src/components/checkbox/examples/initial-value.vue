<script setup lang="ts">
import { Checkbox } from '../..'
</script>

<template>
  <Checkbox.Root :defaultChecked="true">
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
