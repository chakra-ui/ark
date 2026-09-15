<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ContentState } from '@zag-js/marquee'
  import type { Snippet } from 'svelte'

  export interface MarqueeContentState extends ContentState {}

  export interface MarqueeContentBaseProps extends PolymorphicProps<'div', MarqueeContentState>, RefAttribute {
    children?: Snippet
  }
  export interface MarqueeContentProps extends HTMLProps<'div'>, MarqueeContentBaseProps {}
</script>

<script lang="ts">
  import { useMarqueeContext } from './use-marquee-context.ts'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'

  let { ref = $bindable(null), children, ...props }: MarqueeContentProps = $props()

  const marquee = useMarqueeContext()
</script>

{#each Array.from({ length: marquee().contentCount }) as _, index (index)}
  {@const mergedProps = mergeProps(marquee().getContentProps({ index }), props)}
  {#if index === 0}
    <Ark as="div" bind:ref {...mergedProps} state={marquee().getContentState({ index })}>
      {#if children}
        {@render children()}
      {/if}
    </Ark>
  {:else}
    <Ark as="div" {...mergedProps} state={marquee().getContentState({ index })}>
      {#if children}
        {@render children()}
      {/if}
    </Ark>
  {/if}
{/each}
