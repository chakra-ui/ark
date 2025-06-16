<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseRadioGroupItemContext } from './use-radio-group-item-context'

  export interface RadioGroupItemContextProps {
    render: Snippet<[UseRadioGroupItemContext]>
  }
</script>

<script lang="ts">
  import { useRadioGroupItemContext } from './use-radio-group-item-context'

  let { render }: RadioGroupItemContextProps = $props()

  const context = useRadioGroupItemContext()
</script>

{@render render(context)}
