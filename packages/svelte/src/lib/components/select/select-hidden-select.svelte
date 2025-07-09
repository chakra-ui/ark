<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectHiddenSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface SelectHiddenSelectProps extends Assign<HTMLProps<'select'>, SelectHiddenSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  let { ref = $bindable(null), ...props }: SelectHiddenSelectProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getHiddenSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each select().collection.items as item}
    <option value={select().collection.stringifyItem(item)}>
      {select().collection.stringifyItem(item)}
    </option>
  {/each}
</Ark>
