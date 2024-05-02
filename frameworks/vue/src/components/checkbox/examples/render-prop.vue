<script setup lang="ts">
import { Checkbox } from '../..'
import { CheckIcon } from './icons'
</script>

<template>
  <Checkbox.Root>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Context v-slot="checkbox">
      <Checkbox.Label>Checkbox {{ checkbox.checked.toString() }}</Checkbox.Label>
    </Checkbox.Context>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
