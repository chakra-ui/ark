<script setup lang="ts">
import { HoverCard } from '../..'
</script>

<template>
  <HoverCard.Root
    :positioning="{
      placement: 'right',
      gutter: 12,
    }"
  >
    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
    <Teleport to="body">
      <HoverCard.Positioner>
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
