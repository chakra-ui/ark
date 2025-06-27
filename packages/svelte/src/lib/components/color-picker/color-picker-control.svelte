<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerControlProps extends Assign<HTMLProps<'div'>, ColorPickerControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(), ...props }: ColorPickerControlProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
