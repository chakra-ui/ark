<script setup lang="ts">
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'

const tooltip = useTooltip()
</script>

<template>
  <button @click="tooltip.setOpen(true)">Open</button>

  <Tooltip.RootProvider :value="tooltip">
    <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="styles.Content">I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.RootProvider>
</template>
