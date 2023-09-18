<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '../'
import '../menu.css'
</script>
<template>
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <Teleport to="body">
      <MenuPositioner>
        <MenuContent>
          <span>main menu content</span>
          <MenuItem id="new-tab">New Tab...</MenuItem>
          <MenuItem id="new-win">New Window...</MenuItem>
          <MenuSeparator />
          <Menu>
            <MenuTriggerItem>Share &gt;</MenuTriggerItem>
            <Teleport to="body">
              <MenuPositioner>
                <MenuContent>
                  <span>nested menu content</span>
                  <MenuItem id="twitter">Twitter</MenuItem>
                  <MenuItem id="message">Message</MenuItem>
                </MenuContent>
              </MenuPositioner>
            </Teleport>
          </Menu>
        </MenuContent>
      </MenuPositioner>
    </Teleport>
  </Menu>
</template>
