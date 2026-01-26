<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Context v-slot="tooltip">
          <Tooltip.Content :class="styles.Content">This tooltip is open: {{ tooltip.open.toString() }}</Tooltip.Content>
        </Tooltip.Context>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
