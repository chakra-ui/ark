<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface DatePickerMonthSelectProps extends Assign<HTMLProps<'select'>, DatePickerMonthSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(), ...props }: DatePickerMonthSelectProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getMonthSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each datePicker().getMonths() as month, i}
    <option value={month.value}>
      {month.label}
    </option>
  {/each}
</Ark>
