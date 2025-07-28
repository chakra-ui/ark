<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Teleport } from 'vue'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Root>
            <Menu.TriggerItem>JS Frameworks</Menu.TriggerItem>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="react">React</Menu.Item>
                  <Menu.Item value="solid">Solid</Menu.Item>
                  <Menu.Item value="vue">Vue</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
          <Menu.Root>
            <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="panda">Panda</Menu.Item>
                  <Menu.Item value="tailwind">Tailwind</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>
