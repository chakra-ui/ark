<script lang="ts">
  import { Progress } from '@ark-ui/svelte/progress'
</script>

<Progress.Root defaultValue={20} min={10} max={30}>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
</Progress.Root>
