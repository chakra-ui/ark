<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
import field from 'styles/field.module.css'

interface User {
  id: string
  name: string
  email: string
}

const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
]

const activeUser = ref<User | null>(null)
</script>

<template>
  <Dialog.Root @trigger-value-change="(e) => (activeUser = users.find((u) => u.id === e.value) ?? null)">
    <div :class="button.Group">
      <Dialog.Trigger v-for="user in users" :key="user.id" :value="user.id" :class="button.Root">
        Edit {{ user.name }}
      </Dialog.Trigger>
    </div>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.Title :class="styles.Title">Edit User</Dialog.Title>
          <Dialog.Description :class="styles.Description">Update the user's information below.</Dialog.Description>
          <template v-if="activeUser">
            <div :class="styles.Body">
              <div :class="field.Root">
                <label :class="field.Label">Name</label>
                <input :class="field.Input" :value="activeUser.name" />
              </div>
              <div :class="field.Root">
                <label :class="field.Label">Email</label>
                <input :class="field.Input" :value="activeUser.email" />
              </div>
            </div>
            <div :class="styles.Actions">
              <Dialog.CloseTrigger :class="button.Root">Cancel</Dialog.CloseTrigger>
              <Dialog.CloseTrigger :class="button.Root" data-variant="solid">Save Changes</Dialog.CloseTrigger>
            </div>
          </template>
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
