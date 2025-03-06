<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { ref } from 'vue'

const value = ref('Testing')
</script>

<template>
  <button @click="() => (value = 'Chakra')">Set to Chakra</button>
  <p>Current value: {{ value }}</p>
  <Editable.Root v-model="value">
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
</template>
