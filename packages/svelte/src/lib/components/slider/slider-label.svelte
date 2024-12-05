<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SliderLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface SliderLabelProps extends HTMLProps<'label'>, SliderLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSliderContext } from './use-slider-context'

  const props: SliderLabelProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
