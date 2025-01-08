<script lang="ts">
import { Progress } from '@ark-ui/svelte/progress'
</script>

<Progress.Root defaultValue={42}>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
</Progress.Root>
