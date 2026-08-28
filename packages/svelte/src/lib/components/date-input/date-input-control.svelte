<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DateInputControlProps extends Assign<HTMLProps<'div'>, DateInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), ...props }: DateInputControlProps = $props()

  const dateInput = useDateInputContext()
  const mergedProps = $derived(mergeProps(dateInput().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
