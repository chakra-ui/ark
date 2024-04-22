<script setup lang="ts">
import { HoverCard } from '../..'
</script>

<template>
  <HoverCard.Root>
    <HoverCard.Context v-slot="hoverCard">
      <HoverCard.Trigger>Hover me {{ hoverCard.isOpen ? '▲' : '▼' }}</HoverCard.Trigger>
    </HoverCard.Context>
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
