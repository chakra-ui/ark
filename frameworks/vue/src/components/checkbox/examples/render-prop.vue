<script setup lang="ts">
import { Checkbox } from '../..'
</script>

<template>
  <Checkbox.Root>
    <Checkbox.Control>
      <Checkbox.Context v-slot="{ checked, indeterminate }">
        <span v-if="checked">✓</span>
        <span v-if="indeterminate">-</span>
      </Checkbox.Context>
    </Checkbox.Control>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
