<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { RootState } from '@zag-js/slider'
  import type { UseSliderReturn } from './use-slider.svelte.ts'

  export interface SliderRootProviderState extends RootState {}

  interface RootProviderProps {
    value: UseSliderReturn
  }

  export interface SliderRootProviderBaseProps
    extends RootProviderProps, PolymorphicProps<'div', SliderRootProviderState>, RefAttribute {}
  export interface SliderRootProviderProps extends Assign<HTMLProps<'div'>, SliderRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { SliderProvider } from './use-slider-context.ts'

  let { ref = $bindable(null), value: slider, ...localProps }: SliderRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(slider().getRootProps(), localProps))

  SliderProvider(() => slider())
</script>

<Ark as="div" bind:ref {...mergedProps} state={slider().getRootState()} />
