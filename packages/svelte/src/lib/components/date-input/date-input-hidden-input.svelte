<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface DateInputHiddenInputProps extends Assign<HTMLProps<'input'>, DateInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFieldContext } from '../field/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), ...props }: DateInputHiddenInputProps = $props()

  const dateInput = useDateInputContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(dateInput().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
