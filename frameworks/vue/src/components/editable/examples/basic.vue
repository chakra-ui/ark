<script setup lang="ts">
import { ref } from 'vue'
import { Editable } from '../..'
const value = ref('Chakra')
</script>

<template>
  <Editable.Root placeholder="Placeholder" activationMode="dblclick">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
</template>
