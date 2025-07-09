<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderThumbBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AngleSliderThumbProps extends HTMLProps<'div'>, AngleSliderThumbBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderThumbProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getThumbProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
