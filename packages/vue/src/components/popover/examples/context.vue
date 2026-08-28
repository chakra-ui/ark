<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger :class="button.Root">Click Me</Popover.Trigger>
    <Teleport to="body">
      <Popover.Positioner>
        <Popover.Context v-slot="popover">
          <Popover.Content :class="styles.Content">
            <Popover.CloseTrigger :class="styles.CloseTrigger">
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title :class="styles.Title">Status</Popover.Title>
            <Popover.Description :class="styles.Description">
              Popover is {{ popover.open ? 'visible' : 'hidden' }}
            </Popover.Description>
          </Popover.Content>
        </Popover.Context>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
