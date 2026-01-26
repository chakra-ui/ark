<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { Timer } from '@ark-ui/vue/timer'
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'
</script>

<template>
  <Timer.Root class="stack" :countdown="true" :startMs="5 * 60 * 1000">
    <Timer.Area :class="styles.Area">
      <div :class="styles.ItemGroup">
        <Timer.Item :class="styles.Item" type="minutes" />
        <span :class="styles.ItemLabel">minutes</span>
      </div>
      <Timer.Separator :class="styles.Separator">:</Timer.Separator>
      <div :class="styles.ItemGroup">
        <Timer.Item :class="styles.Item" type="seconds" />
        <span :class="styles.ItemLabel">seconds</span>
      </div>
    </Timer.Area>
    <Timer.Control class="hstack">
      <Timer.ActionTrigger :class="button.Root" action="start">
        <PlayIcon />
        Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger :class="button.Root" action="pause">
        <PauseIcon />
        Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger :class="button.Root" action="reset">
        <RotateCcwIcon />
        Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
</template>
