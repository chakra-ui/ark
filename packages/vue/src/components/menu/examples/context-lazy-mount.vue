<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Teleport } from 'vue'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Menu.Root lazy-mount unmount-on-exit>
    <Menu.ContextTrigger :class="styles.ContextTrigger">Right click here</Menu.ContextTrigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item :class="styles.Item" value="cut">Cut</Menu.Item>
          <Menu.Item :class="styles.Item" value="copy">Copy</Menu.Item>
          <Menu.Item :class="styles.Item" value="paste">Paste</Menu.Item>
          <Menu.Separator :class="styles.Separator" />
          <Menu.Root lazy-mount unmount-on-exit>
            <Menu.TriggerItem :class="styles.TriggerItem">Share</Menu.TriggerItem>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content :class="styles.Content">
                  <Menu.Item :class="styles.Item" value="email">Email</Menu.Item>
                  <Menu.Item :class="styles.Item" value="message">Message</Menu.Item>
                  <Menu.Item :class="styles.Item" value="airdrop">AirDrop</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>
