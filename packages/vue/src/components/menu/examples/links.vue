<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="docs" as-child>
          <a href="https://ark-ui.com">Documentation</a>
        </Menu.Item>
        <Menu.Item value="github" as-child>
          <a href="https://github.com/chakra-ui/ark">GitHub</a>
        </Menu.Item>
        <Menu.Item value="twitter" as-child>
          <a href="https://twitter.com/ark_ui_">Twitter</a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
