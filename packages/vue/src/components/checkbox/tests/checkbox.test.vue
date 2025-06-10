<script setup lang="ts">
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { Checkbox, type CheckboxRootEmits, type CheckboxRootProps } from '../'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<CheckboxRootProps>()
const emits = defineEmits<CheckboxRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Checkbox.Group>
    <Checkbox.Root v-bind="localProps">
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
