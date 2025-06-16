<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface ColorPickerLabelProps extends Assign<HTMLProps<'label'>, ColorPickerLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerLabelProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
