<script setup lang="ts">
import { ref, Teleport } from 'vue'
import {
  Menu,
  MenuContent,
  MenuPositioner,
  MenuTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  type MenuOptionItemState,
  MenuTriggerItem,
} from '../'
import '../menu.css'

const menuValue = {
  framework: '',
  libraries: [],
}

const frameworkRadioData: { value: string; label: string }[] = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
]

const frameworkItemsRef = ref<MenuOptionItemState[]>()
</script>
<template>
  <Menu :value="menuValue">
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <Teleport to="body">
      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup id="radio-group">
            <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
            <MenuOptionItem
              v-for="(item, idx) in frameworkRadioData"
              :key="item.value"
              ref="frameworkItemsRef"
              name="framework"
              type="radio"
              :value="item.value"
            >
              {{ frameworkItemsRef?.[idx].isActive ? '✅' : '' }}
              {{ item.label }}
            </MenuOptionItem>
          </MenuItemGroup>
          <Menu>
            <MenuTriggerItem>Share &gt;</MenuTriggerItem>
            <Teleport to="body">
              <MenuPositioner>
                <MenuContent>
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
