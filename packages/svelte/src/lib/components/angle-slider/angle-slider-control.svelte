<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AngleSliderControlProps extends HTMLProps<'div'>, AngleSliderControlBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderControlProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
