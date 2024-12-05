<script module lang="ts">
  import type { Assign, HTMLProps } from '$lib/types'
  import type { UseSliderReturn } from './use-slider.svelte'

  interface RootProviderProps {
    value: UseSliderReturn
  }

  export interface SliderRootProviderBaseProps extends RootProviderProps {}
  export interface SliderRootProviderProps
    extends Assign<HTMLProps<'div'>, SliderRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { SliderProvider } from './use-slider-context'

  const { value: slider, ...localProps }: SliderRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(slider().getRootProps(), localProps))

  SliderProvider(slider)
</script>

<Ark as="div" {...mergedProps} />
