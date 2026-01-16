<script lang="ts">
  import { Timer, useTimer } from '@ark-ui/svelte/timer'
  import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/timer.module.css'

  const id = $props.id()
  const timer = useTimer({ id, targetMs: 60 * 60 * 1000 })
</script>

<div class="stack">
  <output>timer: {JSON.stringify(timer().time)}</output>

  <Timer.RootProvider value={timer}>
    <Timer.Area class={styles.Area}>
      <div class={styles.ItemGroup}>
        <Timer.Item class={styles.Item} type="hours" />
        <span class={styles.ItemLabel}>hours</span>
      </div>
      <Timer.Separator class={styles.Separator}>:</Timer.Separator>
      <div class={styles.ItemGroup}>
        <Timer.Item class={styles.Item} type="minutes" />
        <span class={styles.ItemLabel}>minutes</span>
      </div>
      <Timer.Separator class={styles.Separator}>:</Timer.Separator>
      <div class={styles.ItemGroup}>
        <Timer.Item class={styles.Item} type="seconds" />
        <span class={styles.ItemLabel}>seconds</span>
      </div>
    </Timer.Area>
    <Timer.Control class="hstack">
      <Timer.ActionTrigger class={button.Root} action="start">
        <PlayIcon /> Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger class={button.Root} action="resume">
        <PlayIcon /> Resume
      </Timer.ActionTrigger>
      <Timer.ActionTrigger class={button.Root} action="pause">
        <PauseIcon /> Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger class={button.Root} action="reset">
        <RotateCcwIcon /> Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.RootProvider>
</div>
