<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseRadioGroupContext } from './use-radio-group-context.ts'

  export interface RadioGroupContextProps {
    render?: Snippet<[UseRadioGroupContext]>
    /**
     * @deprecated Use `render` instead.
     */
    children?: Snippet<[UseRadioGroupContext]>
  }
</script>

<script lang="ts">
  import { useRadioGroupContext } from './use-radio-group-context.ts'

  const { render, children }: RadioGroupContextProps = $props()

  const context = useRadioGroupContext()
</script>

{@render (render ?? children)?.(context)}
