<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ColorFormat } from '@zag-js/color-picker'

  interface FormatOptions {
    format: ColorFormat
  }

  export interface ColorPickerViewBaseProps extends FormatOptions, PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerViewProps extends Assign<HTMLProps<'div'>, ColorPickerViewBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'
  import { colorPickerAnatomy } from './color-picker.anatomy.ts'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerViewProps = $props()
  const [formatProps, localProps] = $derived(createSplitProps<FormatOptions>()(props, ['format']))

  const colorPicker = useColorPickerContext()

  ColorPickerFormatPropsProvider(() => formatProps)
</script>

{#if colorPicker().format === formatProps.format}
  <Ark as="div" bind:ref data-format={formatProps.format} {...colorPickerAnatomy.build().view.attrs} {...localProps} />
{/if}
