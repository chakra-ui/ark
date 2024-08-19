<script setup lang="ts">
import { Timer } from '../..'
</script>

<template>
  <Timer.Root :targetMs="60 * 60 * 1000">
    <Timer.Item type="days" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="hours" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />

    <div>
      <Timer.ActionTrigger action="start">Play</Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
    </div>
  </Timer.Root>
</template>
