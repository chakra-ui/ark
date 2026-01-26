<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSliderProps } from './use-slider.svelte'

  export interface SliderRootBaseProps extends Optional<UseSliderProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderRootProps extends Assign<HTMLProps<'div'>, SliderRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { SliderProvider } from './use-slider-context'
  import { useSlider } from './use-slider.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: SliderRootProps = $props()
  const providedId = $props.id()

  const [useSliderProps, localProps] = $derived(
    createSplitProps<Optional<UseSliderProps, 'id'>>()(props, [
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
      'thumbCollisionBehavior',
      'thumbSize',
      'aria-labelledby',
      'aria-label',
    ]),
  )

  const resolvedProps = $derived<UseSliderProps>({
    ...useSliderProps,
    id: useSliderProps.id ?? providedId,
    value,
    onValueChange(details) {
      useSliderProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const slider = useSlider(() => resolvedProps)
  const mergedProps = $derived(mergeProps(slider().getRootProps(), localProps))

  SliderProvider(slider)
</script>

<Ark as="div" bind:ref {...mergedProps} />
