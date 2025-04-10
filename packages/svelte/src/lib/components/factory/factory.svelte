<script lang="ts" generics="T extends keyof SvelteHTMLElements">
  import type { HTMLProps, PolymorphicProps, PropsFn } from '$lib/types'
  import { isVoidHTMLTag, isVoidSVGTag } from '$lib/utils/tags'
  import { mergeProps } from '@zag-js/svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import SvgElement from './svg-element.svelte'

  type Props = HTMLProps<T> &
    PolymorphicProps<T> & {
      as: T
    }

  const { asChild = false, children, render, as, ...rest }: Props = $props()

  const propsFn: PropsFn<T> = (props) => mergeProps(rest, props ?? {})
</script>

{#if asChild}
  {@render render?.(propsFn)}
{:else if isVoidSVGTag(as)}
  <SvgElement {as} {...rest} />
{:else if isVoidHTMLTag(as)}
  <svelte:element this={as} {...rest} />
{:else}
  <svelte:element this={as} {...rest}>
    {@render children?.()}
  </svelte:element>
{/if}
