<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseSliderReturn } from './use-slider.svelte'

  interface RootProviderProps {
    value: UseSliderReturn
  }

  export interface SliderRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface SliderRootProviderProps extends Assign<HTMLProps<'div'>, SliderRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { SliderProvider } from './use-slider-context'

  let { ref = $bindable(), value: slider, ...localProps }: SliderRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(slider().getRootProps(), localProps))

  SliderProvider(slider)
</script>

<Ark as="div" bind:ref {...mergedProps} />
