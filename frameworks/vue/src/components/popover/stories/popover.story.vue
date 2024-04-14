<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '../'
import './popover.css'

const open = ref(false)
</script>

<template>
  <Story title="Popover">
    <Variant title="Basic">
      <Popover.Root>
        <Popover.Trigger>
          Click Me <Popover.Indicator>{{ '>' }}</Popover.Indicator>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="Portalled">
      <Popover.Root portalled>
        <Popover.Trigger>
          Click Me <Popover.Indicator>{{ '>' }}</Popover.Indicator>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="OnOpenChange">
      <Popover.Root @open-change="(open) => console.log(open ? 'opened' : 'closed')">
        <Popover.Trigger>
          Click Me <Popover.Indicator>{{ '>' }}</Popover.Indicator>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="Controlled">
      <Fragment>
        <button @click="() => (open = !open)">toggle</button>
        <Popover.Root v-model:open="open">
          <Popover.Anchor>Anchor</Popover.Anchor>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Title>Title</Popover.Title>
              <Popover.Description>Description</Popover.Description>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      </Fragment>
    </Variant>

    <Variant title="RenderFn">
      <Popover.Root v-slot="{ isOpen }">
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description: {{ isOpen.toString() }}</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="Arrow">
      <Popover.Root>
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="CloseBehavior">
      <Popover.Root :closeOnEsc="false" :closeOnInteractOutside="false">
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="Positioning">
      <Popover.Root
        :positioning="{
          placement: 'left-start',
          gutter: 16,
          offset: { mainAxis: 12, crossAxis: 12 },
        }"
      >
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>

    <Variant title="Modal">
      <Popover.Root modal>
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Variant>
  </Story>
</template>
