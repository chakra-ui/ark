<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseNumberFlowContext } from './use-number-flow-context.ts'

  export interface NumberFlowContextProps {
    render?: Snippet<[UseNumberFlowContext]>
  }
</script>

<script lang="ts">
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  const { render }: NumberFlowContextProps = $props()
  const numberFlow = useNumberFlowContext()
</script>

{@render render?.(numberFlow)}
