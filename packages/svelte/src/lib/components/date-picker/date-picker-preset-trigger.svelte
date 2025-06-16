<script module lang="ts">
  import type { PresetTriggerProps } from '@zag-js/date-picker'
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerPresetTriggerBaseProps extends PresetTriggerProps, PolymorphicProps<'button'> {}
  export interface DatePickerPresetTriggerProps extends Assign<HTMLProps<'button'>, DatePickerPresetTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  const props: DatePickerPresetTriggerProps = $props()

  const [presetTriggerProps, localProps] = $derived(createSplitProps<PresetTriggerProps>()(props, ['value']))
  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getPresetTriggerProps(presetTriggerProps), localProps))
</script>

<Ark as="button" {...mergedProps} />
