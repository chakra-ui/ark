<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { Tooltip } from '@ark-ui/vue/tooltip'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
import tooltipStyles from 'styles/tooltip.module.css'
</script>

<template>
  <Popover.Root>
    <Tooltip.Root>
      <Tooltip.Trigger #render="ctx">
        <Popover.Trigger v-bind="ctx.props" :class="button.Root">Click Me</Popover.Trigger>
      </Tooltip.Trigger>
      <Teleport to="body">
        <Tooltip.Positioner>
          <Tooltip.Content :class="tooltipStyles.Content">See more details</Tooltip.Content>
        </Tooltip.Positioner>
      </Teleport>
    </Tooltip.Root>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="styles.Content">
          <Popover.Title :class="styles.Title">Favorite Frameworks</Popover.Title>
          <Popover.Description :class="styles.Description">
            Manage and organize your favorite web frameworks.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
