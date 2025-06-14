<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectValueTextBaseProps extends PolymorphicProps<'span'> {
    placeholder?: string
  }
  export interface SelectValueTextProps extends Assign<HTMLProps<'span'>, SelectValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectValueTextProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getValueTextProps(), props))
</script>

<Ark as="span" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {select().valueAsString || props.placeholder}
  {/if}
</Ark>
