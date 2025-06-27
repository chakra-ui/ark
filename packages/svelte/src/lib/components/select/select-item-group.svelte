<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    id?: string
  }
  export interface SelectItemGroupProps extends Assign<HTMLProps<'div'>, SelectItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'
  import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

  let { ref = $bindable(null), ...props }: SelectItemGroupProps = $props()
  const providedId = $props.id()

  const groupProps = $derived({ id: props.id ?? providedId })
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getItemGroupProps(groupProps), props))

  SelectItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
