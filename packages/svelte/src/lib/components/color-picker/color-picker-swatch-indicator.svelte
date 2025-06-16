<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface ColorPickerSwatchIndicatorProps
    extends Assign<HTMLProps<'div'>, ColorPickerSwatchIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'

  const props: ColorPickerSwatchIndicatorProps = $props()

  const colorPicker = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchIndicatorProps(swatchProps()), props))
</script>

<Ark as="div" {...mergedProps} />
