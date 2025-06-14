<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectHiddenSelectBaseProps extends PolymorphicProps<'select'> {}
  export interface SelectHiddenSelectProps extends Assign<HTMLProps<'select'>, SelectHiddenSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectHiddenSelectProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getHiddenSelectProps(), props))
</script>

<Ark as="select" {...mergedProps}>
  {#each select().collection.items as item}
    <option value={select().collection.stringifyItem(item)}>
      {select().collection.stringifyItem(item)}
    </option>
  {/each}
</Ark>
