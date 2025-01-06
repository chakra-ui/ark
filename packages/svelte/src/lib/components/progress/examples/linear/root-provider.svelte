<script lang="ts">
  import { Progress, useProgress } from '@ark-ui/svelte/progress'

  const progress = useProgress()
</script>

<button onclick={() => progress().setToMax()}>Set to MAX</button>

<Progress.RootProvider value={progress}>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.RootProvider>
