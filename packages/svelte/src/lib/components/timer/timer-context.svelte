<script lang="ts">
  import type { Snippet } from 'svelte'
  import { type UseTimerContext, useTimerContext } from './use-timer-context'

  export interface TimerContextProps {
    api?: Snippet<[UseTimerContext]>
  }

  const { api }: TimerContextProps = $props()
  const timer = useTimerContext()
</script>

{@render api?.(timer)}
