<script setup lang="ts">
import { Drawer } from '@ark-ui/vue/drawer'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'
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
  <Drawer.Root
    swipe-direction="end"
    @trigger-value-change="(e) => (activeUser = users.find((u) => u.id === e.value) ?? null)"
  >
    <div :class="button.Group">
      <Drawer.Trigger v-for="user in users" :key="user.id" :value="user.id" :class="button.Root">
        Edit {{ user.name }}
      </Drawer.Trigger>
    </div>
    <Drawer.Backdrop :class="styles.Backdrop" />
    <Drawer.Positioner :class="styles.Positioner">
      <Drawer.Content :class="styles.Content">
        <Drawer.Grabber :class="styles.Grabber">
          <Drawer.GrabberIndicator :class="styles.GrabberIndicator" />
        </Drawer.Grabber>
        <Drawer.Title :class="styles.Title">Edit User</Drawer.Title>
        <div v-if="activeUser" class="stack">
          <div :class="field.Root">
            <label :class="field.Label">Name</label>
            <input :class="field.Input" :value="activeUser.name" />
          </div>
          <div :class="field.Root">
            <label :class="field.Label">Email</label>
            <input :class="field.Input" :value="activeUser.email" />
          </div>
          <div :class="button.Group">
            <Drawer.CloseTrigger :class="button.Root">Cancel</Drawer.CloseTrigger>
            <Drawer.CloseTrigger :class="button.Root" data-variant="solid">Save Changes</Drawer.CloseTrigger>
          </div>
        </div>
        <Drawer.CloseTrigger :class="styles.CloseTrigger">
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
</template>
