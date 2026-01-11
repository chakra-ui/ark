<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/menu.module.css'

const open = ref(false)
</script>

<template>
  <div class="stack">
    <button type="button" :class="button.Root" @click="open = !open">Toggle</button>
    <Menu.Root v-model:open="open">
      <Menu.Trigger :class="styles.Trigger">
        Actions
        <Menu.Indicator :class="styles.Indicator">
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item :class="styles.Item" value="edit">Edit</Menu.Item>
          <Menu.Item :class="styles.Item" value="duplicate">Duplicate</Menu.Item>
          <Menu.Item :class="styles.Item" value="archive">Archive</Menu.Item>
          <Menu.Item :class="styles.Item" value="delete">Delete</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </div>
</template>
