<script lang="ts">
  import { Timer } from '@ark-ui/svelte/timer'
  import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/timer.module.css'

  let isWorking = $state(true)
  let cycles = $state(0)

  const handleComplete = () => {
    isWorking = !isWorking
    if (!isWorking) {
      cycles += 1
    }
  }
</script>

<Timer.Root class="stack" startMs={isWorking ? 25 * 60 * 1000 : 5 * 60 * 1000} countdown onComplete={handleComplete}>
  <h2>{isWorking ? 'Work Session' : 'Break Session'}</h2>

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
    <Timer.ActionTrigger class={button.Root} action="pause">
      <PauseIcon /> Pause
    </Timer.ActionTrigger>
    <Timer.ActionTrigger class={button.Root} action="reset">
      <RotateCcwIcon /> Reset
    </Timer.ActionTrigger>
  </Timer.Control>

  <output>Completed cycles: {cycles}</output>
</Timer.Root>
