<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuItemGroup,
  MenuItemGroupLabel,
} from '../'
import '../menu.css'
</script>
<template>
  <Menu ref="menuRef">
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <Teleport to="body">
      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup id="group-1">
            <MenuItemGroupLabel htmlFor="group-1">Group 1</MenuItemGroupLabel>
            <MenuItem id="share">Share...</MenuItem>
            <MenuItem id="move">Move...</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup id="group-2">
            <MenuItemGroupLabel htmlFor="group-2">Group 2</MenuItemGroupLabel>
            <MenuItem id="rename">Rename...</MenuItem>
            <MenuItem id="delete">Delete...</MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </Teleport>
  </Menu>
</template>
