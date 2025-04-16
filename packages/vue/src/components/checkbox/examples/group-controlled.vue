<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const value = ref(['react'])

const toggleValue = () => {
  value.value = value.value[0] === 'react' ? ['solid'] : ['react']
}
</script>

<template>
  <button @click="toggleValue">Toggle Value</button>
  <Checkbox.Group v-model="value" name="framework">
    <Checkbox.Root v-for="item in items" :value="item.value" :key="item.value">
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
