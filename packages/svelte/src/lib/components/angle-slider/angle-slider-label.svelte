<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface AngleSliderLabelProps extends HTMLProps<'label'>, AngleSliderLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderLabelProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
