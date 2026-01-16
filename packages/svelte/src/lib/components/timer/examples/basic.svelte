<script lang="ts">
  import { Timer } from '@ark-ui/svelte/timer'
  import { PauseIcon, PlayIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/timer.module.css'
</script>

<Timer.Root class="stack" targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
  <Timer.Area class={styles.Area}>
    <div class={styles.ItemGroup}>
      <Timer.Item class={styles.Item} type="days" />
      <span class={styles.ItemLabel}>days</span>
    </div>
    <Timer.Separator class={styles.Separator}>:</Timer.Separator>
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
      <PlayIcon /> Play
    </Timer.ActionTrigger>
    <Timer.ActionTrigger class={button.Root} action="resume">
      <PlayIcon /> Resume
    </Timer.ActionTrigger>
    <Timer.ActionTrigger class={button.Root} action="pause">
      <PauseIcon /> Pause
    </Timer.ActionTrigger>
  </Timer.Control>
</Timer.Root>
