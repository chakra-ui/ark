<script setup lang="ts">
import { ref, Teleport } from 'vue'
import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '../'
import '../menu.css'

const menuRef = ref<{
  context: {
    isOpen: boolean
    onClose: () => void
  }
}>()
</script>
<template>
  <Story title="Menu - Basic">
    <Menu ref="menuRef">
      <MenuTrigger>
        <button>{{ menuRef?.context.isOpen ? 'Close' : 'Open' }} menu</button>
      </MenuTrigger>
      <Teleport to="body">
        <MenuPositioner>
          <MenuContent>
            <MenuItem id="search">Search</MenuItem>
            <MenuItem id="undo">Undo</MenuItem>
            <MenuItem id="delivery" disabled> Delivery </MenuItem>
            <MenuItem id="unlink">Unlink</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Teleport>
    </Menu>
  </Story>
</template>
