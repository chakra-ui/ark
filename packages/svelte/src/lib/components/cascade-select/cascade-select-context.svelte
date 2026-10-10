<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCascadeSelectReturn } from './use-cascade-select.svelte'

  export interface CascadeSelectContextProps {
    render: Snippet<[UseCascadeSelectReturn]>
  }
</script>

<script lang="ts">
  import { useCascadeSelectContext } from './use-cascade-select-context'

  const props: CascadeSelectContextProps = $props()
  const cascadeSelect = useCascadeSelectContext()
</script>

{@render props.render(cascadeSelect)}
