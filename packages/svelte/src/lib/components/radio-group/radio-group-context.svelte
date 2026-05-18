<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseRadioGroupContext } from './use-radio-group-context.ts'

  export interface RadioGroupContextProps {
    children: Snippet<[UseRadioGroupContext]>
  }
</script>

<script lang="ts">
  import { useRadioGroupContext } from './use-radio-group-context.ts'

  let { children }: RadioGroupContextProps = $props()

  const context = useRadioGroupContext()
</script>

{@render children(context)}
