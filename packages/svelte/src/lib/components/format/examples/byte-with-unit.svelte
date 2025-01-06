<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'

  const value = 1450.45
  const unit = 'bit'
</script>

<div>
  File size:
  <Format.Byte {value} {unit} />
</div>
