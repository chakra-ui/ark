<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
</script>

<template>
  <Popover.Root :positioning="{ sameWidth: true }">
    <Popover.Trigger :class="button.Root" :style="{ minWidth: '200px' }">Click Me</Popover.Trigger>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title :class="styles.Title">Matched Width</Popover.Title>
          <Popover.Description :class="styles.Description">
            This popover matches the width of its trigger element.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
