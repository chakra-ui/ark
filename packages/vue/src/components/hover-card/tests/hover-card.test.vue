<script setup lang="ts">
import { HoverCard, type HoverCardRootEmits, type HoverCardRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<HoverCardRootProps>()
const emits = defineEmits<HoverCardRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <HoverCard.Root :openDelay="0" :closeDelay="0" v-bind="localProps">
    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
    <Teleport to="body">
      <HoverCard.Positioner data-testid="positioner">
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          Content
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>
