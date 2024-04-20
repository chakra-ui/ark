<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard } from '../..'

const open = ref(false)
</script>

<template>
  <HoverCard.Root>
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
