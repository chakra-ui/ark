<script lang="ts">
  import { Timer } from '@ark-ui/svelte/timer'
  import { PlayIcon, RotateCcwIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/timer.module.css'

  let ticks = $state(0)

  const handleComplete = () => console.log('Timer completed')
  const handleTick = () => (ticks += 1)
</script>

<Timer.Root class="stack" targetMs={60 * 1000} onComplete={handleComplete} onTick={handleTick}>
  <Timer.Area class={styles.Area}>
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
    <Timer.ActionTrigger class={button.Root} action="reset">
      <RotateCcwIcon /> Reset
    </Timer.ActionTrigger>
  </Timer.Control>

  <output>Ticks: {ticks}</output>
</Timer.Root>
