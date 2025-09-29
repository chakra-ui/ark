<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
</script>

<template>
  <Checkbox.Root disabled>
    <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
