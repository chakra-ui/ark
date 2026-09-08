<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'
import tooltipStyles from 'styles/tooltip.module.css'
</script>

<template>
  <Menu.Root>
    <Tooltip.Root>
      <Tooltip.Trigger #render="ctx">
        <Menu.Trigger v-bind="ctx.props" :class="styles.Trigger">
          File
          <Menu.Indicator :class="styles.Indicator">
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
      </Tooltip.Trigger>
      <Teleport to="body">
        <Tooltip.Positioner>
          <Tooltip.Content :class="tooltipStyles.Content">Open the file menu</Tooltip.Content>
        </Tooltip.Positioner>
      </Teleport>
    </Tooltip.Root>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.Arrow :class="styles.Arrow">
          <Menu.ArrowTip :class="styles.ArrowTip" />
        </Menu.Arrow>
        <Menu.Item :class="styles.Item" value="new-file">New File</Menu.Item>
        <Menu.Item :class="styles.Item" value="open">Open...</Menu.Item>
        <Menu.Item :class="styles.Item" value="save">Save</Menu.Item>
        <Menu.Item :class="styles.Item" value="save-as">Save As...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
