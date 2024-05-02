<script setup lang="ts">
import { Checkbox } from '../'
</script>

<template>
  <Checkbox.Root>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control" >
      <Checkbox.Indicator />
    </Checkbox.Control>
  
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
