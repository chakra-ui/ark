<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface SelectPositionerProps extends Assign<HTMLProps<'div'>, SelectPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectPositionerProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getPositionerProps(), props))
</script>

<Ark as="div" {...mergedProps} />
