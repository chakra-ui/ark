<script lang="ts">
  import { Progress } from '@ark-ui/svelte/progress'

  let value = $state(42)
</script>

<Progress.Root bind:value>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
</Progress.Root>
