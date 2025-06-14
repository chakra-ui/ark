<script lang="ts" generics="T extends keyof SvelteHTMLElements">
  import type { HTMLProps, PolymorphicProps, PropsFn } from '$lib/types'
  import { isVoidHTMLTag, isVoidSVGTag } from '$lib/utils/tags'
  import { mergeProps } from '@zag-js/svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import Svg from './svg-factory.svelte'

  type Props = HTMLProps<T> &
    PolymorphicProps<T> & {
      as: T
      ref?: Element | null
    }

  let { asChild = false, children, render, as, ref = $bindable<Element | null>(null), ...rest }: Props = $props()

  const propsFn: PropsFn<T> = (props) => mergeProps(rest, props ?? {})
</script>

{#if asChild}
  {@render render?.(propsFn)}
{:else if isVoidSVGTag(as)}
  <Svg {as} {...rest} bind:ref />
{:else if isVoidHTMLTag(as)}
  <svelte:element this={as} {...rest} bind:this={ref} />
{:else}
  <svelte:element this={as} {...rest} bind:this={ref}>
    {@render children?.()}
  </svelte:element>
{/if}
