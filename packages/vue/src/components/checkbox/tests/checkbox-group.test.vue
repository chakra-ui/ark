<script setup lang="ts">
import { Checkbox } from '../'
</script>

<template>
  <Checkbox.Group>
    <Checkbox.Root value="one">
      <Checkbox.Label>One</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root value="two" disabled>
      <Checkbox.Label>Two</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root value="three">
      <Checkbox.Label>Three</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
</template>
