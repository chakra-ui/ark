<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'

  const value = 50345.53
  const unitDisplays = ['narrow', 'short', 'long'] as const
</script>

<div>
  {#each unitDisplays as unitDisplay (unitDisplay)}
    <div>
      <Format.Byte {value} {unitDisplay} />
    </div>
  {/each}
</div>
