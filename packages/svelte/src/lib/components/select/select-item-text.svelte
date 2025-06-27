<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SelectItemTextProps extends Assign<HTMLProps<'span'>, SelectItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'
  import { useSelectItemPropsContext } from './use-select-item-props-context'

  let { ref = $bindable(), ...props }: SelectItemTextProps = $props()
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(select().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
