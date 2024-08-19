<script setup lang="ts">
import { Timer } from '../..'
</script>

<template>
  <Timer.Root :autoStart="true" :countdown="true" :startMs="60 * 60 * 500">
    <Timer.Item type="days" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="hours" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />
  </Timer.Root>
</template>
