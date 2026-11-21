<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.List>
          <Menu.Item value="react">React</Menu.Item>
          <Menu.Separator as-child>
            <hr data-testid="separator" />
          </Menu.Separator>
          <Menu.Item value="vue">Vue</Menu.Item>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
