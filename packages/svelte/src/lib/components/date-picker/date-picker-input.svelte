<script module lang="ts">
  import type { InputProps, InputState } from '@zag-js/date-picker'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerInputState extends InputState {}
  export interface DatePickerInputBaseProps
    extends InputProps, PolymorphicProps<'input', DatePickerInputState>, RefAttribute {}
  export interface DatePickerInputProps extends Assign<HTMLProps<'input'>, DatePickerInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(null), ...props }: DatePickerInputProps = $props()

  const [inputProps, localProps] = $derived(createSplitProps<InputProps>()(props, ['index', 'fixOnBlur']))
  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getInputProps(inputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} state={datePicker().getInputState()} />
