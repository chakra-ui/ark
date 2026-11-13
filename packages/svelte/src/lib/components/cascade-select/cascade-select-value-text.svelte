<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    placeholder?: string
  }
  export interface CascadeSelectValueTextProps extends Assign<HTMLProps<'span'>, CascadeSelectValueTextBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectValueTextProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {cascadeSelect().valueAsString || props.placeholder}
  {/if}
</Ark>
