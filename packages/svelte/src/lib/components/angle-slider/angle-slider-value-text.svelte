<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderValueTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderValueTextProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
