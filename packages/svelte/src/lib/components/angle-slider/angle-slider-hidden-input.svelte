<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface AngleSliderHiddenInputProps extends HTMLProps<'input'>, AngleSliderHiddenInputBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAngleSliderContext } from './use-angle-slider-context'

  let { ref = $bindable(null), ...props }: AngleSliderHiddenInputProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
