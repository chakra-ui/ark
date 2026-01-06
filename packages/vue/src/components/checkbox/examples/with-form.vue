<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log('terms:', formData.get('terms'))
}
</script>

<template>
  <form style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start" @submit="handleSubmit">
    <Checkbox.Root :class="styles.Root" name="terms" value="accepted">
      <Checkbox.Control :class="styles.Control">
        <Checkbox.Indicator :class="styles.Indicator">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label :class="styles.Label">I agree to the terms and conditions</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <button :class="button.Root" data-variant="solid" type="submit">Submit</button>
  </form>
</template>
