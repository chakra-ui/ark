<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseProgressContext } from './use-progress-context.ts'

  export interface ProgressContextProps {
    api?: Snippet<[UseProgressContext]>
  }
</script>

<script lang="ts">
  import { useProgressContext } from './use-progress-context.ts'

  const { api }: ProgressContextProps = $props()
  const progress = useProgressContext()
</script>

{@render api?.(progress)}
