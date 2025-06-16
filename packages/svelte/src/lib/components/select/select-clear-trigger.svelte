<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectClearTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface SelectClearTriggerProps extends Assign<HTMLProps<'button'>, SelectClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectClearTriggerProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getClearTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
