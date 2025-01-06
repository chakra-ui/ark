<script lang="ts">
  import { Progress } from '@ark-ui/svelte/progress'
</script>

<Progress.Root value={20} min={10} max={30}>
  <Progress.Label>Label</Progress.Label>
  <Progress.ValueText />
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>
