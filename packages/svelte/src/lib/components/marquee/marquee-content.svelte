<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface MarqueeContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    children?: Snippet
  }
  export interface MarqueeContentProps extends HTMLProps<'div'>, MarqueeContentBaseProps {}
</script>

<script lang="ts">
  import { useMarqueeContext } from './use-marquee-context'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'

  let { ref = $bindable(null), children, ...props }: MarqueeContentProps = $props()

  const marquee = useMarqueeContext()
</script>

{#each Array.from({ length: marquee().contentCount }) as _, index (index)}
  {@const mergedProps = mergeProps(marquee().getContentProps({ index }), props)}
  {#if index === 0}
    <Ark as="div" bind:ref {...mergedProps}>
      {#if children}
        {@render children()}
      {/if}
    </Ark>
  {:else}
    <Ark as="div" {...mergedProps}>
      {#if children}
        {@render children()}
      {/if}
    </Ark>
  {/if}
{/each}
