<script setup lang="ts">
import { Checkbox } from '../'
</script>

<template>
  <Checkbox.Root>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control" />
    <Checkbox.Indicator />
  </Checkbox.Root>
</template>
