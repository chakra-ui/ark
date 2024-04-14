<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '../'

const open = ref(false)
</script>

<template>
  <Fragment>
    <button @click="() => (open = !open)">toggle</button>
    <Popover.Root v-model="open">
      <Popover.Trigger>
        click me
        <Popover.Indicator />
      </Popover.Trigger>
      <Popover.Anchor>Anchor</Popover.Anchor>
      <Popover.Positioner data-testid="positioner">
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Content>
          <Popover.Title>title</Popover.Title>
          <Popover.Description>description</Popover.Description>
          <Popover.CloseTrigger>close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  </Fragment>
</template>
