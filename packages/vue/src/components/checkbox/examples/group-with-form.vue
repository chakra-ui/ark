<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
]

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log(formData.getAll('framework'))
}
</script>

<template>
  <form @submit="handleSubmit">
    <Checkbox.Group :default-value="['react']" name="framework">
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
    <button type="submit">Submit</button>
  </form>
</template>
