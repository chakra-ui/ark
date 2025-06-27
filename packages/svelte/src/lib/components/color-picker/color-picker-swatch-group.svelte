<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerSwatchGroupProps extends Assign<HTMLProps<'div'>, ColorPickerSwatchGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(null), ...props }: ColorPickerSwatchGroupProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchGroupProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
