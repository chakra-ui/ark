<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ref } from 'vue'
import styles from 'styles/tooltip.module.css'

const open = ref(false)
</script>

<template>
  <button @click="open = !open">Toggle</button>
  <Tooltip.Root v-model:open="open">
    <Tooltip.Trigger :class="styles.Trigger">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="styles.Content">I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
