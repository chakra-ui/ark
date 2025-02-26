<script lang="ts">
  import { Progress, useProgress } from '@ark-ui/svelte/progress'

  const id = $props.id()
  const progress = useProgress({ id })
</script>

<button onclick={() => progress().setToMax()}>Set to MAX</button>

<Progress.RootProvider value={progress}>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
</Progress.RootProvider>
