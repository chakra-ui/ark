<script lang="ts">
  import type { Optional } from '$lib/types'
  import { NumberFlow, type UseNumberFlowProps, useNumberFlow } from '../index.ts'

  const props: Optional<UseNumberFlowProps, 'id'> = $props()
  const id = $props.id()
  const numberFlow = useNumberFlow(() => ({ ...props, id }))
</script>

<NumberFlow.RootProvider value={numberFlow}>
  <NumberFlow.Segments />
  <NumberFlow.HiddenValueText />
</NumberFlow.RootProvider>
<button type="button" onclick={() => numberFlow().setValue(13.5)}>Update</button>
