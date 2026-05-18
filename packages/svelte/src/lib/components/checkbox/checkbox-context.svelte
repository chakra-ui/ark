<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCheckboxContext } from './use-checkbox-context.ts'

  export interface CheckboxContextProps {
    render?: Snippet<[UseCheckboxContext]>
  }
</script>

<script lang="ts">
  import { useCheckboxContext } from './use-checkbox-context.ts'

  const { render }: CheckboxContextProps = $props()

  const context = useCheckboxContext()
</script>

{@render render?.(context)}
