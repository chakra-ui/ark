<script setup lang="ts">
import { Checkbox } from '../..'
</script>

<template>
  <Checkbox.Root>
    <Checkbox.Control>
      <Checkbox.Context v-slot="{ isChecked, isIndeterminate }">
        <span v-if="isChecked">✓</span>
        <span v-if="isIndeterminate">-</span>
      </Checkbox.Context>
    </Checkbox.Control>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
