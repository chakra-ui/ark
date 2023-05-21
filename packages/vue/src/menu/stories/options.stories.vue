<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Menu,
  MenuContent,
  MenuPositioner,
  MenuTrigger,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
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
              v-for="item in frameworkRadioData"
              :key="item.value"
              name="framework"
              type="radio"
              :value="item.value"
              v-slot="{ isActive }"
            >
              {{ isActive ? '✅' : '' }}
              {{ item.label }}
            </MenuOptionItem>
          </MenuItemGroup>
          <MenuItemGroup id="radio-group">
            <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
            <MenuOptionItem
              v-for="item in libraryCheckboxData"
              :key="item.value"
              name="libraries"
              type="checkbox"
              :value="item.value"
              v-slot="{ isActive }"
            >
              {{ isActive ? '✅' : '' }}
              {{ item.label }}
            </MenuOptionItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </Teleport>
  </Menu>
</template>
