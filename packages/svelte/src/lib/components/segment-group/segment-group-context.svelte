<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSegmentGroupContext } from './use-segment-group-context'

  export interface SegmentGroupContextProps {
    render: Snippet<[UseSegmentGroupContext]>
  }
</script>

<script lang="ts">
  import { useSegmentGroupContext } from './use-segment-group-context'

  let { render }: SegmentGroupContextProps = $props()

  const context = useSegmentGroupContext()
</script>

{@render render(context)}
