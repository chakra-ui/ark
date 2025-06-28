<script lang="ts" module>
  import type { Snippet } from 'svelte'
  import type { UseAngleSliderContext } from './use-angle-slider-context'

  export interface AngleSliderContextProps {
    render: Snippet<[UseAngleSliderContext]>
  }
</script>

<script lang="ts">
  import { useAngleSliderContext } from './use-angle-slider-context'

  const { render }: AngleSliderContextProps = $props()
  const angleSlider = useAngleSliderContext()
</script>

{@render render?.(angleSlider)}
