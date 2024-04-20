<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '../..'

const isOpen = ref(false)
const value = ref({
  framework: '',
  libraries: [],
})
</script>

<template>
  <Menu.Root lazyMount closeOnSelect>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Item id="delivery" disabled> Delivery </Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
