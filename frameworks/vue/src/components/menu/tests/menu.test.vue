<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '../'

const items = ref(['react', 'solid', 'vue', 'svelte'])
const isChecked = ref(false)
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>
      Open menu
      <Menu.Indicator />
    </Menu.Trigger>
    <Menu.ContextTrigger>Open Context Menu</Menu.ContextTrigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content>
        <Menu.Arrow>
          <Menu.ArrowTip />
        </Menu.Arrow>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>Ark UI</Menu.ItemGroupLabel>
          <Menu.Item value="dialog" disabled>Dialog</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Separator />
        <Menu.CheckboxItem v-model:checked="isChecked" value="my-checkbox">
          <Menu.ItemIndicator>✅</Menu.ItemIndicator>
          <Menu.ItemText>Check me</Menu.ItemText>
        </Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.RadioItemGroup>
          <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
          <Menu.RadioItem v-for="item in items" :key="item" :value="item">
            <Menu.ItemIndicator>✅</Menu.ItemIndicator>
            <Menu.ItemText>{{ item }}</Menu.ItemText>
          </Menu.RadioItem>
        </Menu.RadioItemGroup>
        <Menu.Separator />
        <Menu.Root>
          <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="panda">Panda</Menu.Item>
              <Menu.Item value="tailwind">Tailwind</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
