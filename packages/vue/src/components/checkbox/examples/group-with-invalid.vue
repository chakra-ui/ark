<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]
</script>

<template>
  <Checkbox.Group invalid>
    <Checkbox.Root v-for="item in items" :key="item.value" :value="item.value">
      <Checkbox.Label>{{ item.label }}</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
</template>
