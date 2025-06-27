<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { SwatchProps } from '@zag-js/color-picker'

  export interface ColorPickerSwatchBaseProps extends SwatchProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerSwatchProps extends Assign<HTMLProps<'div'>, ColorPickerSwatchBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(), ...props }: ColorPickerSwatchProps = $props()

  const [swatchProps, localProps] = $derived(createSplitProps<SwatchProps>()(props, ['value', 'respectAlpha']))

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchProps(swatchProps), localProps))

  ColorPickerSwatchPropsProvider(() => swatchProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
