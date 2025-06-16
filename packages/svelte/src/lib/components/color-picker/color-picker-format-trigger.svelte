<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface ColorPickerFormatTriggerProps
    extends Assign<HTMLProps<'button'>, ColorPickerFormatTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerFormatTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getFormatTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
