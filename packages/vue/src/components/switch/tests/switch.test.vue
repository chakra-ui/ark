<script setup lang="ts">
import { Switch, type SwitchRootEmits, type SwitchRootProps } from '@ark-ui/vue/switch'
import { useForwardPropsEmits } from '@ark-ui/vue'

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
