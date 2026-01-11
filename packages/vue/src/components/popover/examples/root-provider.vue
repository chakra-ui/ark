<script setup lang="ts">
import { Popover, usePopover } from '@ark-ui/vue/popover'
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
    <button :class="button.Root" @click="popover.setOpen(true)">
      Popover is {{ popover.open ? 'open' : 'closed' }}
    </button>

    <Popover.RootProvider :value="popover" portalled>
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.Title :class="styles.Title">Controlled Externally</Popover.Title>
          <Popover.Description :class="styles.Description">
            This popover is controlled via the usePopover hook.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.RootProvider>
  </div>
</template>
