<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseProgressContext } from './use-progress-context.ts'

  export interface ProgressContextProps {
    render?: Snippet<[UseProgressContext]>
    /**
     * @deprecated Use `render` instead.
     */
    api?: Snippet<[UseProgressContext]>
  }
</script>

<script lang="ts">
  import { useProgressContext } from './use-progress-context.ts'

  const { render, api }: ProgressContextProps = $props()
  const progress = useProgressContext()
</script>

{@render (render ?? api)?.(progress)}
