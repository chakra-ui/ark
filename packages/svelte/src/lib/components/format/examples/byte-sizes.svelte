<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'

  const byteSizes = [50, 5000, 5000000, 5000000000]
</script>

<div>
  {#each byteSizes as size, index (index)}
    <div>
      <Format.Byte value={size} />
    </div>
  {/each}
</div>
