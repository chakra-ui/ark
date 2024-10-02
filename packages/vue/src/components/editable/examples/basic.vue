<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
</script>

<template>
  <Editable.Root placeholder="Placeholder">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
</template>
