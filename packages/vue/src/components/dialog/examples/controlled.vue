<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const open = ref(false)
</script>

<template>
  <button :class="button.Root" @click="() => (open = true)">Toggle</button>
  <Dialog.Root v-model:open="open">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Session Settings</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            Manage your session preferences and security options.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
