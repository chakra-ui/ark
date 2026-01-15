<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="styles.Content">
          <Tooltip.Arrow :class="styles.Arrow">
            <Tooltip.ArrowTip :class="styles.ArrowTip" />
          </Tooltip.Arrow>
          I am a tooltip!
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
