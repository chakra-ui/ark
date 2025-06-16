<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseColorPickerContext } from './use-color-picker-context'

  export interface ColorPickerContextProps {
    render: Snippet<[UseColorPickerContext]>
  }
</script>

<script lang="ts">
  import { useColorPickerContext } from './use-color-picker-context'

  const { render }: ColorPickerContextProps = $props()

  const context = useColorPickerContext()
</script>

{@render render(context)}
