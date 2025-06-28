<script lang="ts" module>
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseAngleSliderProps } from './use-angle-slider.svelte'

  export interface AngleSliderRootBaseProps
    extends Optional<UseAngleSliderProps, 'id'>,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface AngleSliderRootProps extends Assign<HTMLProps<'div'>, AngleSliderRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { AngleSliderProvider } from './use-angle-slider-context'
  import { useAngleSlider } from './use-angle-slider.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: AngleSliderRootProps = $props()
  const providedId = $props.id()

  const [useAngleSliderProps, localProps] = $derived(
    createSplitProps<Optional<UseAngleSliderProps, 'id'>>()(props, [
      'id',
      'ids',
      'name',
      'invalid',
      'readOnly',
      'disabled',
      'onValueChangeEnd',
      'onValueChange',
      'defaultValue',
      'value',
      'step',
    ]),
  )

  const resolvedProps = $derived<UseAngleSliderProps>({
    ...useAngleSliderProps,
    id: useAngleSliderProps.id ?? providedId,
    value,
    onValueChange(details) {
      useAngleSliderProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const angleSlider = useAngleSlider(() => resolvedProps)
  const mergedProps = $derived(mergeProps(angleSlider().getRootProps(), localProps))

  AngleSliderProvider(angleSlider)
</script>

<Ark as="div" bind:ref {...mergedProps} />
