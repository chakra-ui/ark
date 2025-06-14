<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface SelectItemContextProps {
    render: Snippet<[UseSelectItemContext]>
  }
</script>

<script lang="ts">
  import { useSelectItemContext, type UseSelectItemContext } from './use-select-item-context'

  const props: SelectItemContextProps = $props()
  const item = useSelectItemContext()
</script>

{@render props.render(item)}
