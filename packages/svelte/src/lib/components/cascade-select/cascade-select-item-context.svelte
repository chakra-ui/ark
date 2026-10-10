<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCascadeSelectItemContext } from './use-cascade-select-item-context'

  export interface CascadeSelectItemContextProps {
    render: Snippet<[UseCascadeSelectItemContext]>
  }
</script>

<script lang="ts">
  import { useCascadeSelectItemContext } from './use-cascade-select-item-context'

  const props: CascadeSelectItemContextProps = $props()
  const item = useCascadeSelectItemContext()
</script>

{@render props.render(item)}
