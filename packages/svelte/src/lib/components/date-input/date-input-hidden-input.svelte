<script module lang="ts">
  import type { HiddenInputProps } from '@zag-js/date-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute, HiddenInputProps {}
  export interface DateInputHiddenInputProps extends Assign<HTMLProps<'input'>, DateInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), ...props }: DateInputHiddenInputProps = $props()

  const dateInput = useDateInputContext()
  const [hiddenInputProps, localProps] = $derived(createSplitProps<HiddenInputProps>()(props, ['index', 'name']))
  const mergedProps = $derived(mergeProps(dateInput().getHiddenInputProps(hiddenInputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />
