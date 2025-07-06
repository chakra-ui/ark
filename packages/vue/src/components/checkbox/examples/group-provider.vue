<script setup lang="ts">
import { Checkbox, useCheckboxGroup } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

const group = useCheckboxGroup({
  defaultValue: ['react'],
  name: 'framework',
})
</script>

<template>
  <Checkbox.GroupProvider :value="group">
    <Checkbox.Root v-for="item in items" :value="item.value" :key="item.value">
      <Checkbox.Label>{{ item.label }}</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.GroupProvider>
</template>
