<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CascadeSelectItemTextProps extends Assign<HTMLProps<'span'>, CascadeSelectItemTextBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'
  import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

  let { ref = $bindable(null), ...props }: CascadeSelectItemTextProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
