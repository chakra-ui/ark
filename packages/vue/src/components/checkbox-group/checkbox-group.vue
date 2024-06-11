<script setup lang="ts">
import type { CheckboxGroupEmits, CheckboxGroupProps } from './checkbox-group.types.ts'
import { useCheckboxGroup } from './use-checkbox-group'
import { CheckboxGroupProvider } from './use-checkbox-group-context'

const props = defineProps<CheckboxGroupProps>()
const emits = defineEmits<CheckboxGroupEmits>()

const checkboxGroup = useCheckboxGroup(props, emits)
CheckboxGroupProvider(checkboxGroup)
</script>

<template>
  <slot />
</template>
