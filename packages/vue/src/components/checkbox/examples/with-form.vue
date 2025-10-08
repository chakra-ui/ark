<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log('terms:', formData.get('terms'))
}
</script>

<template>
  <form @submit="handleSubmit">
    <Checkbox.Root name="terms" value="accepted">
      <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <button type="submit">Submit</button>
  </form>
</template>
