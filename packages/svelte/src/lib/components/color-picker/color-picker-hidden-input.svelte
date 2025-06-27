<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface ColorPickerHiddenInputProps extends Assign<HTMLProps<'input'>, ColorPickerHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useFieldContext } from '../field'

  let { ref = $bindable(), ...props }: ColorPickerHiddenInputProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getHiddenInputProps(), props))
  const field = useFieldContext()
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
