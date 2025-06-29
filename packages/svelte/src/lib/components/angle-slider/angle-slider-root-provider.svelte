<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseAngleSliderReturn } from './use-angle-slider.svelte'

  interface RootProviderProps {
    value: UseAngleSliderReturn
  }

  export interface AngleSliderRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface AngleSliderRootProviderProps extends Assign<HTMLProps<'div'>, AngleSliderRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { AngleSliderProvider } from './use-angle-slider-context'

  let { ref = $bindable(null), value: angleSlider, ...localProps }: AngleSliderRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(angleSlider().getRootProps(), localProps))

  AngleSliderProvider(angleSlider)
</script>

<Ark as="div" bind:ref {...mergedProps} />
