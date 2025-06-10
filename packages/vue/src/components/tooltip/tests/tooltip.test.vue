<script setup lang="ts">
import { Tooltip, type TooltipRootEmits, type TooltipRootProps } from '../'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>
<template>
  <Tooltip.Root :openDelay="0" :closeDelay="0" v-bind="localProps">
    <Tooltip.Trigger>hover me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      <Tooltip.Content>content</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
