<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'
</script>

<template>
  <div style="position: fixed; top: 40px; left: 40px; padding: 40px; background: red">
    <Tooltip.Root :positioning="{ strategy: 'fixed' }">
      <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
      <Teleport to="body">
        <Tooltip.Positioner>
          <Tooltip.Content :class="styles.Content">I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Teleport>
    </Tooltip.Root>
  </div>
</template>
