<script setup lang="ts">
import { ToggleGroup, type ToggleGroupRootEmits, type ToggleGroupRootProps } from '../'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<ToggleGroupRootProps>()
const emits = defineEmits<ToggleGroupRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <ToggleGroup.Root v-bind="localProps">
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
