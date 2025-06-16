<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface DatePickerLabelProps extends Assign<HTMLProps<'label'>, DatePickerLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  const props: DatePickerLabelProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
