<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { SwatchTriggerProps } from '@zag-js/color-picker'

  export interface ColorPickerSwatchTriggerBaseProps extends SwatchTriggerProps, PolymorphicProps<'button'> {}
  export interface ColorPickerSwatchTriggerProps
    extends Assign<HTMLProps<'button'>, ColorPickerSwatchTriggerBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerSwatchTriggerProps = $props()

  const [swatchTriggerProps, localProps] = $derived(
    createSplitProps<SwatchTriggerProps>()(props, ['value', 'disabled']),
  )

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchTriggerProps(swatchTriggerProps), localProps))
</script>

<Ark as="button" {...mergedProps} />
