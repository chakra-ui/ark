<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    fallback?: Snippet
  }
  export interface FieldRequiredIndicatorProps extends Assign<HTMLProps<'span'>, FieldRequiredIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  let { ref = $bindable(), ...props }: FieldRequiredIndicatorProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.().getRequiredIndicatorProps() ?? {}, props))
</script>

{#if field?.().required}
  <Ark as="span" bind:ref {...mergedProps}>
    {#if props.children}
      {@render props.children?.()}
    {:else}
      *
    {/if}
  </Ark>
{:else}
  {@render props.fallback?.()}
{/if}
