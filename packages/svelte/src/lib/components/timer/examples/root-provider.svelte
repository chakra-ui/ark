<script lang="ts">
  import { Timer, useTimer } from '@ark-ui/svelte/timer'

  const timer = useTimer({ targetMs: 60 * 60 * 1000 })
</script>

<button onclick={() => timer().pause()}>Pause</button>

<Timer.RootProvider value={timer}>
  <Timer.Area>
    <Timer.Item type="days" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="hours" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />
  </Timer.Area>
  <Timer.Control>
    <Timer.ActionTrigger action="start">Play</Timer.ActionTrigger>
    <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
    <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
  </Timer.Control>
</Timer.RootProvider>
