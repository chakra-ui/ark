<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseComboboxItemContext } from './use-combobox-item-context'

  export interface ComboboxItemContextProps {
    render: Snippet<[UseComboboxItemContext]>
  }
</script>

<script lang="ts">
  import { useComboboxItemContext } from './use-combobox-item-context'

  const { render }: ComboboxItemContextProps = $props()

  const context = useComboboxItemContext()
</script>

{@render render(context)}
