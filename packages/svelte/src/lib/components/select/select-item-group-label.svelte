<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
  export interface SelectItemGroupLabelProps extends Assign<HTMLProps<'div'>, SelectItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'
  import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context'

  const props: SelectItemGroupLabelProps = $props()

  const select = useSelectContext()
  const groupProps = useSelectItemGroupPropsContext()

  const mergedProps = $derived(mergeProps(select().getItemGroupLabelProps({ htmlFor: groupProps().id }), props))
</script>

<Ark as="div" {...mergedProps} />
