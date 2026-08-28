<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDateInputContext } from './use-date-input-context.js'

  export interface DateInputContextProps {
    render: Snippet<[UseDateInputContext]>
  }
</script>

<script lang="ts">
  import { useDateInputContext } from './use-date-input-context.js'

  let { render }: DateInputContextProps = $props()

  const context = useDateInputContext()
</script>

{@render render(context)}
