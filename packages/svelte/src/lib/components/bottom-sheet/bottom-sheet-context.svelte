<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseBottomSheetContext } from './use-bottom-sheet-context'

  export interface BottomSheetContextProps {
    children: Snippet<[UseBottomSheetContext]>
  }
</script>

<script lang="ts">
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  const { children }: BottomSheetContextProps = $props()

  const bottomSheet = useBottomSheetContext()
</script>

{@render children(bottomSheet)}
