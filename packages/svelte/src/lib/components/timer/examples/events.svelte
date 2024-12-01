<script lang="ts">
  import { Timer, type TimerTickDetails } from '@ark-ui/svelte/timer'

  const handleComplete = () => console.log('Timer completed')
  const handleTick = (details: TimerTickDetails) => console.log('Tick:', details.formattedTime)
</script>

<Timer.Root targetMs={5 * 1000} onComplete={handleComplete} onTick={handleTick}>
  <Timer.Item type="seconds" />
</Timer.Root>
