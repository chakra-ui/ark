<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseSliderProps } from './use-slider.svelte'

  export interface SliderRootBaseProps extends UseSliderProps, PolymorphicProps<'div'> {}
  export interface SliderRootProps extends Assign<HTMLProps<'div'>, SliderRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { SliderProvider } from './use-slider-context'
  import { useSlider } from './use-slider.svelte'

  const props: SliderRootProps = $props()
  const [useSliderProps, localProps] = $derived(
    createSplitProps<UseSliderProps>()(props, [
      'id',
      'ids',
      'value',
      'min',
      'max',
      'step',
      'orientation',
      'disabled',
      'readOnly',
      'defaultValue',
      'origin',
      'minStepsBetweenThumbs',
      'name',
      'form',
      'invalid',
      'onValueChange',
      'onValueChangeEnd',
      'onFocusChange',
      'getAriaValueText',
      'thumbAlignment',
      'thumbSize',
      'aria-labelledby',
      'aria-label',
    ]),
  )

  const slider = useSlider(reflect(() => useSliderProps))
  const mergedProps = $derived(mergeProps(slider().getRootProps(), localProps))

  SliderProvider(slider)
</script>

<Ark as="div" {...mergedProps} />
