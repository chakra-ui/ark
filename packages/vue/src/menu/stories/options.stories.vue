<script setup lang="ts">
import { ref, Teleport } from 'vue'
import {
  Menu,
  MenuContent,
  MenuPositioner,
  MenuTrigger,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  type MenuOptionItemState,
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

const libraryCheckboxData: { value: string; label: string }[] = [
  { value: 'zag-js', label: 'ZagJS' },
  { value: 'ark', label: 'Ark' },
  { value: 'panda', label: 'Panda' },
  { value: 'chakra', label: 'ChakraUI' },
]

const frameworkItemsRef = ref<MenuOptionItemState[]>()
const libraryItemsRef = ref<MenuOptionItemState[]>()
</script>
<template>
  <Story title="Menu - Options">
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
            <MenuItemGroup id="radio-group">
              <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
              <MenuOptionItem
                v-for="(item, idx) in libraryCheckboxData"
                :key="item.value"
                ref="libraryItemsRef"
                name="libraries"
                type="checkbox"
                :value="item.value"
              >
                {{ libraryItemsRef?.[idx].isActive ? '✅' : '' }}
                {{ item.label }}
              </MenuOptionItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </Teleport>
    </Menu>
  </Story>
</template>
