<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface SelectClearTriggerProps extends Assign<HTMLProps<'button'>, SelectClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  let { ref = $bindable(null), ...props }: SelectClearTriggerProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
