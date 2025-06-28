<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderMarkerGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AngleSliderMarkerGroupProps extends HTMLProps<'div'>, AngleSliderMarkerGroupBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderMarkerGroupProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getMarkerGroupProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
