<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
</script>

<template>
  <Popover.Root
    :positioning="{
      placement: 'left-start',
      offset: { mainAxis: 12, crossAxis: 12 },
    }"
    portalled
  >
    <Popover.Trigger :class="button.Root">Click Me</Popover.Trigger>
    <Popover.Positioner :class="styles.Positioner">
      <Popover.Content :class="styles.Content">
        <Popover.CloseTrigger :class="styles.CloseTrigger">
          <XIcon />
        </Popover.CloseTrigger>
        <Popover.Title :class="styles.Title">Left Placement</Popover.Title>
        <Popover.Description :class="styles.Description">
          This popover appears on the left with custom offset values.
        </Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
