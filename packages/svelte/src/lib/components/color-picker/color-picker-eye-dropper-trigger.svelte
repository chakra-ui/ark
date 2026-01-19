<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ColorPickerEyeDropperTriggerProps extends Assign<
    HTMLProps<'button'>,
    ColorPickerEyeDropperTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(null), ...props }: ColorPickerEyeDropperTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getEyeDropperTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
