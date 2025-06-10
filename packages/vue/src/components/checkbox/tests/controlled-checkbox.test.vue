<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxCheckedState, type CheckboxRootEmits, type CheckboxRootProps } from '../'
import { useForwardPropsEmits } from '../../..'

const checked = ref<CheckboxCheckedState>(false)

const props = defineProps<CheckboxRootProps>()
const emits = defineEmits<CheckboxRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <button @click="() => (checked = true)">set checked</button>
  <Checkbox.Root :checked="checked" v-bind="localProps">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control">
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
