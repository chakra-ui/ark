<script setup lang="ts">
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { Checkbox, type CheckboxRootProps } from '../'

const props = defineProps<CheckboxRootProps>()
</script>

<template>
  <Checkbox.Group>
    <Checkbox.Root v-bind="props">
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control data-testid="control">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
</template>
