<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps<'span'> {
    fallback?: Snippet
  }
  export interface FieldRequiredIndicatorProps extends Assign<HTMLProps<'span'>, FieldRequiredIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  const props: FieldRequiredIndicatorProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.().getRequiredIndicatorProps() ?? {}, props))
</script>

{#if field?.().required}
  <Ark as="span" {...mergedProps}>
    {#if props.children}
      {@render props.children?.()}
    {:else}
      *
    {/if}
  </Ark>
{:else}
  {@render props.fallback?.()}
{/if}
