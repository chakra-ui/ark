<script module lang="ts">
  import type { DateValue } from '@zag-js/date-picker'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerValueTextRenderProps {
    value: DateValue
    index: number
    valueAsString: string
    remove: () => void
  }

  export interface DatePickerValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    /**
     * Text to display when no date is selected.
     */
    placeholder?: string | undefined
    /**
     * The separator to use between multiple date values when using default rendering.
     * @default ", "
     */
    separator?: string | undefined
  }

  export interface DatePickerValueTextProps extends Assign<HTMLProps<'span'>, DatePickerValueTextBaseProps> {}
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Ark } from '../factory/index.js'
  import { datePickerAnatomy } from './date-picker.anatomy.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let {
    ref = $bindable(null),
    placeholder,
    separator = ', ',
    children,
    ...props
  }: DatePickerValueTextProps & { children?: Snippet<[DatePickerValueTextRenderProps]> } = $props()

  const datePicker = useDatePickerContext()

  const hasValue = $derived(datePicker().value.length > 0)

  const displayValue = $derived(hasValue ? datePicker().valueAsString.join(separator) : placeholder)

  const getRenderProps = (value: DateValue, index: number): DatePickerValueTextRenderProps => ({
    value,
    index,
    valueAsString: datePicker().valueAsString[index],
    remove: () => {
      datePicker().setValue(datePicker().value.filter((_, i) => i !== index))
    },
  })
</script>

{#if children}
  {#if hasValue}
    {#each datePicker().value as value, index (index)}
      {@render children(getRenderProps(value, index))}
    {/each}
  {:else}
    {placeholder}
  {/if}
{:else}
  <Ark as="span" bind:ref {...datePickerAnatomy.build().valueText.attrs} {...props}>
    {displayValue}
  </Ark>
{/if}
