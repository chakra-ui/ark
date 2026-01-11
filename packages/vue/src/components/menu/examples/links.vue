<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      Help
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.Item :class="styles.Item" value="docs" as-child>
          <a href="https://ark-ui.com">Documentation</a>
        </Menu.Item>
        <Menu.Item :class="styles.Item" value="github" as-child>
          <a href="https://github.com/chakra-ui/ark">GitHub</a>
        </Menu.Item>
        <Menu.Separator :class="styles.Separator" />
        <Menu.Item :class="styles.Item" value="changelog" as-child>
          <a href="https://github.com/chakra-ui/ark/releases">Changelog</a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
