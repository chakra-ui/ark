<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'

  const value = 1450.45
</script>

<div>
  File size:
  <Format.Byte {value} />
</div>
