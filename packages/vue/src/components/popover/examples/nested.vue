<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger :class="button.Root">Click Me</Popover.Trigger>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.Title :class="styles.Title">Settings</Popover.Title>
          <Popover.Description :class="styles.Description">
            Manage your preferences and account settings.
          </Popover.Description>
          <Popover.Root lazy-mount unmount-on-exit :positioning="{ placement: 'right' }">
            <Popover.Trigger :class="button.Root">Advanced</Popover.Trigger>
            <Teleport to="body">
              <Popover.Positioner :class="styles.Positioner">
                <Popover.Content :class="styles.Content">
                  <Popover.Title :class="styles.Title">Advanced Settings</Popover.Title>
                  <Popover.Description :class="styles.Description">
                    Configure advanced options for power users.
                  </Popover.Description>
                </Popover.Content>
              </Popover.Positioner>
            </Teleport>
          </Popover.Root>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
