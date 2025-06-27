<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ColorPickerLabelProps extends Assign<HTMLProps<'label'>, ColorPickerLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(), ...props }: ColorPickerLabelProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
