<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/menu.module.css'

const showToolbar = ref(true)
const showStatusBar = ref(false)
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      View
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.CheckboxItem :class="styles.CheckboxItem" v-model:checked="showToolbar" value="toolbar">
          <Menu.ItemIndicator :class="styles.ItemIndicator">
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText :class="styles.ItemText">Show Toolbar</Menu.ItemText>
        </Menu.CheckboxItem>
        <Menu.CheckboxItem :class="styles.CheckboxItem" v-model:checked="showStatusBar" value="status-bar">
          <Menu.ItemIndicator :class="styles.ItemIndicator">
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText :class="styles.ItemText">Show Status Bar</Menu.ItemText>
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
