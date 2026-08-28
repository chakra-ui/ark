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
          <Popover.Title :class="styles.Title">Favorite Frameworks</Popover.Title>
          <Popover.Description :class="styles.Description">
            Manage and organize your favorite web frameworks.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
