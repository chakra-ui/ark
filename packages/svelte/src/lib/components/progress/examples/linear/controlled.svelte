<script lang="ts">
  import { Progress } from '$lib/components/progress'

  let value = $state<number | null>(42)
</script>

<button onclick={() => (value = 50)}>Set to 50</button>

<Progress.Root bind:value>
  <Progress.Label>Label {value}</Progress.Label>
  <Progress.ValueText />
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>
