<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerControlBaseProps extends PolymorphicProps<'div'> {}
  export interface ColorPickerControlProps extends Assign<HTMLProps<'div'>, ColorPickerControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerControlProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
