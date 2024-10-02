<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.CheckboxItem v-model:checked="checked" value="my-checkbox">
          <Menu.ItemIndicator>✅</Menu.ItemIndicator>
          <Menu.ItemText>Check me</Menu.ItemText>
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
