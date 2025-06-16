<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxValueTextBaseProps extends PolymorphicProps<'span'> {
    /**
     * Text to display when no value is selected.
     */
    placeholder?: string
  }
  export interface ListboxValueTextProps extends Assign<HTMLProps<'span'>, ListboxValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  const { children, placeholder, ...localProps }: ListboxValueTextProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getValueTextProps(), localProps))
</script>

<Ark as="span" {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {listbox().valueAsString || placeholder}
  {/if}
</Ark>
