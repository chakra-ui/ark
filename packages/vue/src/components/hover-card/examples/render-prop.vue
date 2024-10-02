<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
</script>

<template>
  <HoverCard.Root>
    <HoverCard.Context v-slot="hoverCard">
      <HoverCard.Trigger>Hover me {{ hoverCard.open ? '▲' : '▼' }}</HoverCard.Trigger>
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
