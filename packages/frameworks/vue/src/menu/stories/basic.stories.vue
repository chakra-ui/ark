<script setup lang="ts">
import { ref, Teleport } from 'vue'
import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '../'
import '../menu.css'
</script>
<template>
  <Menu v-slot="{ isOpen }">
    <MenuTrigger>
      <button>{{ isOpen ? 'Close' : 'Open' }} menu</button>
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
</template>
