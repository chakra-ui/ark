<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'
</script>

<template>
  <Tooltip.Root :closeDelay="0" :openDelay="0">
    <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="styles.Content">I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
