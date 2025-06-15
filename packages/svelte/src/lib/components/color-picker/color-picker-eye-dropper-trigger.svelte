<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface ColorPickerEyeDropperTriggerProps
    extends Assign<HTMLProps<'button'>, ColorPickerEyeDropperTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerEyeDropperTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getEyeDropperTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
