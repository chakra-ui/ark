<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerYearSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface DatePickerYearSelectProps extends Assign<HTMLProps<'select'>, DatePickerYearSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(), ...props }: DatePickerYearSelectProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getYearSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each datePicker().getYears() as year, i}
    <option value={year.value}>
      {year.label}
    </option>
  {/each}
</Ark>
