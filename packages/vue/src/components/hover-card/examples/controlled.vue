<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard } from '../..'

const open = ref(false)
</script>

<template>
  <button @click="() => (open = true)">Open Dialog</button>
  <HoverCard.Root v-model:open="open">
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
