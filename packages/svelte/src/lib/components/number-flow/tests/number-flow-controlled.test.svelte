<script lang="ts">
  import { NumberFlow } from '../index.ts'

  let value = $state(99)
</script>

<NumberFlow.Root {value} locale="en-US">
  <NumberFlow.Segments />
  <NumberFlow.HiddenValueText />
</NumberFlow.Root>
<button type="button" onclick={() => (value = 1000)}>Update</button>
