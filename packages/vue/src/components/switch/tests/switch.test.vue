<script setup lang="ts">
import { Switch, type SwitchRootEmits, type SwitchRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<SwitchRootProps>()
const emits = defineEmits<SwitchRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Switch.Root v-bind="localProps">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
