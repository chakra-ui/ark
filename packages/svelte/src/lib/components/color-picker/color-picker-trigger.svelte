<script module lang="ts">
  import type { TriggerState } from '@zag-js/color-picker'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerTriggerState extends TriggerState {}
  export interface ColorPickerTriggerBaseProps
    extends PolymorphicProps<'button', ColorPickerTriggerState>, RefAttribute {}
  export interface ColorPickerTriggerProps extends Assign<HTMLProps<'button'>, ColorPickerTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(colorPicker().getTriggerProps(), props))
</script>

<Ark
  as="button"
  bind:ref
  aria-describedby={field?.()?.ariaDescribedby}
  {...mergedProps}
  state={colorPicker().getTriggerState()}
/>
