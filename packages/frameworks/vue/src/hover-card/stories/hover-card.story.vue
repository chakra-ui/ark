<script setup lang="ts">
import { Teleport, ref } from 'vue'
import { HoverCard } from '../'
import './hover-card.css'

const open = ref(false)
</script>

<template>
  <Story title="Hover Card">
    <Variant title="Basic">
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
    </Variant>

    <Variant title="Controlled">
      <button @click="() => (open = true)">Open Dialog</button>
      <HoverCard.Root v-model="open">
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
    </Variant>

    <Variant title="Positioning">
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
    </Variant>

    <Variant title="RenderProp">
      <HoverCard.Root v-slot="api">
        <HoverCard.Trigger>Hover me {{ api.isOpen ? '▲' : '▼' }}</HoverCard.Trigger>
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
    </Variant>
  </Story>
</template>
