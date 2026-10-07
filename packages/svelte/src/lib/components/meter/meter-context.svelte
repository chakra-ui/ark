<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMeterContext } from './use-meter-context.ts'

  export interface MeterContextProps {
    render?: Snippet<[UseMeterContext]>
  }
</script>

<script lang="ts">
  import { useMeterContext } from './use-meter-context.ts'

  const { render }: MeterContextProps = $props()
  const meter = useMeterContext()
</script>

{@render render?.(meter)}
