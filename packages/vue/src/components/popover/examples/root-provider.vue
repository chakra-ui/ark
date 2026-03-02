<script setup lang="ts">
import { Popover, usePopover } from '@ark-ui/vue/popover'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

const popover = usePopover({
  positioning: {
    placement: 'bottom-start',
  },
})
</script>

<template>
  <div class="stack">
    <div>Popover is {{ popover.open ? 'open' : 'closed' }}</div>

    <Popover.RootProvider :value="popover">
      <Popover.Trigger :class="button.Root">Toggle Popover</Popover.Trigger>
      <Teleport to="body">
        <Popover.Positioner :class="styles.Positioner">
          <Popover.Content :class="styles.Content">
            <Popover.Title :class="styles.Title">Controlled Externally</Popover.Title>
            <Popover.Description :class="styles.Description">
              This popover is controlled via the usePopover hook.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Teleport>
    </Popover.RootProvider>
  </div>
</template>
