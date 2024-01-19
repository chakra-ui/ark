<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../'
import './tooltip.css'

const isOpen = ref(false)
</script>

<template>
  <Story title="Tooltip">
    <Variant title="Basic">
      <Tooltip.Root>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>

    <Variant title="Controlled">
      <button @click="isOpen = !isOpen">Toggle</button>
      <Tooltip.Root :open="isOpen">
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>

    <Variant title="RenderFn">
      <Tooltip.Root v-slot="{ isOpen }">
        <Tooltip.Trigger>Hover Me, isOpen {{ isOpen.toString() }}</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>This tooltip is open: {{ isOpen.toString() }}</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>

    <Variant title="Arrow">
      <Tooltip.Root>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            I am a tooltip!
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>

    <Variant title="Timings">
      <Tooltip.Root :closeDelay="0" :openDelay="0">
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>

    <Variant title="Positioning">
      <Tooltip.Root
        :positioning="{
          placement: 'left-start',
          gutter: 16,
          offset: { mainAxis: 12, crossAxis: 12 },
        }"
      >
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Variant>
  </Story>
</template>
