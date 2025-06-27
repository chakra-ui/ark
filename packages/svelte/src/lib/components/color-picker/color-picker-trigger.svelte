<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ColorPickerTriggerProps extends Assign<HTMLProps<'button'>, ColorPickerTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(), ...props }: ColorPickerTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
