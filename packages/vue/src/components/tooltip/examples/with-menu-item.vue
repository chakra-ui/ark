<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'
import tooltipStyles from 'styles/tooltip.module.css'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      File
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.Arrow :class="styles.Arrow">
          <Menu.ArrowTip :class="styles.ArrowTip" />
        </Menu.Arrow>
        <Menu.Item :class="styles.Item" value="new-file">New File</Menu.Item>
        <Menu.Item :class="styles.Item" value="open">Open...</Menu.Item>
        <Tooltip.Root>
          <Tooltip.Trigger #render="ctx">
            <Menu.Item v-bind="ctx.props" :class="styles.Item" value="save" disabled>Save</Menu.Item>
          </Tooltip.Trigger>
          <Teleport to="body">
            <Tooltip.Positioner>
              <Tooltip.Content :class="tooltipStyles.Content">No changes to save</Tooltip.Content>
            </Tooltip.Positioner>
          </Teleport>
        </Tooltip.Root>
        <Menu.Item :class="styles.Item" value="save-as">Save As...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
