<script setup lang="ts">
import { Timer } from '@ark-ui/vue/timer'
</script>

<template>
  <Timer.Root :start-ms="12000">
    <Timer.Area>
      <Timer.Item type="seconds" data-testid="item" />
      <Timer.Item type="seconds" as-child>
        <span data-testid="item-as-child">12</span>
      </Timer.Item>
    </Timer.Area>
  </Timer.Root>
</template>
