<script setup lang="ts">
import { Popover, type PopoverRootEmits, type PopoverRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Popover.Root v-bind="localProps">
    <Popover.Trigger>
      click me
      <Popover.Indicator />
    </Popover.Trigger>
    <Popover.Anchor>Anchor</Popover.Anchor>
    <Popover.Positioner data-testid="positioner">
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Content>
        <Popover.Title>title</Popover.Title>
        <Popover.Description>description</Popover.Description>
        <Popover.CloseTrigger>close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
