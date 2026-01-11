<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Teleport } from 'vue'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      File
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item :class="styles.Item" value="new">New File</Menu.Item>
          <Menu.Item :class="styles.Item" value="open">Open...</Menu.Item>
          <Menu.Separator :class="styles.Separator" />
          <Menu.Root>
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
          <Menu.Root>
            <Menu.TriggerItem :class="styles.TriggerItem">Export</Menu.TriggerItem>
            <Teleport to="body">
              <Menu.Positioner>
                <Menu.Content :class="styles.Content">
                  <Menu.Item :class="styles.Item" value="pdf">PDF</Menu.Item>
                  <Menu.Item :class="styles.Item" value="png">PNG</Menu.Item>
                  <Menu.Item :class="styles.Item" value="svg">SVG</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Teleport>
          </Menu.Root>
          <Menu.Separator :class="styles.Separator" />
          <Menu.Item :class="styles.Item" value="print">Print...</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>
