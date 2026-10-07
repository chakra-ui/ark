<script lang="ts">
  import type { Snippet } from 'svelte'
  import { type UseTimerContext, useTimerContext } from './use-timer-context.ts'

  export interface TimerContextProps {
    render?: Snippet<[UseTimerContext]>
    /**
     * @deprecated Use `render` instead.
     */
    api?: Snippet<[UseTimerContext]>
  }

  const { render, api }: TimerContextProps = $props()
  const timer = useTimerContext()
</script>

{@render (render ?? api)?.(timer)}
