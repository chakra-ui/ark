<script lang="ts">
  import { Timer } from '@ark-ui/svelte/timer'

  let isWorking = $state(true)
  let cycles = $state(0)

  const handleComplete = () => {
    isWorking = !isWorking
    if (!isWorking) {
      cycles += 1
    }
  }
</script>

<Timer.Root
  startMs={isWorking ? 25 * 60 * 1000 : 5 * 60 * 1000}
  countdown
  onComplete={handleComplete}
>
  <h2>{isWorking ? 'Work Session' : 'Break Session'}</h2>
  <Timer.Area>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />
  </Timer.Area>

  <Timer.Control>
    <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
    <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
    <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
  </Timer.Control>
  <p>Completed cycles: {cycles}</p>
</Timer.Root>
