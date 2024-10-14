<script setup lang="ts">
import { HoverCard, useHoverCard } from '@ark-ui/vue/hover-card'

const hoverCard = useHoverCard()
</script>

<template>
  <button @click="hoverCard.setOpen(true)">Open</button>

  <HoverCard.RootProvider :value="hoverCard">
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
  </HoverCard.RootProvider>
</template>
