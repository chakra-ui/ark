<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
import { ref, Teleport } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

const open = ref(false)
</script>

<template>
  <Popover.Root v-model:open="open">
    <Popover.Trigger :class="button.Root">Click Me</Popover.Trigger>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title :class="styles.Title">Team Members</Popover.Title>
          <Popover.Description :class="styles.Description">
            Invite colleagues to collaborate on this project.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
