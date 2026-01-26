<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ColorPickerFormatTriggerProps extends Assign<
    HTMLProps<'button'>,
    ColorPickerFormatTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(null), ...props }: ColorPickerFormatTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getFormatTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
