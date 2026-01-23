<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log(formData.getAll('framework'))
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]
</script>

<template>
  <form class="stack" @submit="handleSubmit">
    <Checkbox.Group :class="styles.Group" :defaultValue="['react']" name="framework">
      <Checkbox.Root :class="styles.Root" v-for="item in items" :key="item.value" :value="item.value">
        <Checkbox.Control :class="styles.Control">
          <Checkbox.Indicator :class="styles.Indicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label :class="styles.Label">{{ item.label }}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Checkbox.Group>
    <button :class="button.Root" type="submit">Submit</button>
  </form>
</template>
