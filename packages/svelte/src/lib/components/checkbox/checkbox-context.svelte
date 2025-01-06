<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCheckboxContext } from './use-checkbox-context'

  export interface CheckboxContextProps {
    api?: Snippet<[UseCheckboxContext]>
  }
</script>

<script lang="ts">
  import { useCheckboxContext } from './use-checkbox-context'

  const { api }: CheckboxContextProps = $props()
  const checkbox = useCheckboxContext()
</script>

{@render api?.(checkbox)}
