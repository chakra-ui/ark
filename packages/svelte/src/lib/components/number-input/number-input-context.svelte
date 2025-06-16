<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseNumberInputContext } from './use-number-input-context'

  export interface NumberInputContextProps {
    render: Snippet<[UseNumberInputContext]>
  }
</script>

<script lang="ts">
  import { useNumberInputContext } from './use-number-input-context'

  const { render }: NumberInputContextProps = $props()

  const context = useNumberInputContext()
</script>

{@render render(context)}
