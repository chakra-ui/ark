<script lang="ts" generics="T extends keyof SvelteHTMLElements">
import type { HTMLProps, PolymorphicProps, PropsFn } from '$lib/types'
import { mergeProps } from '@zag-js/svelte'
import type { SvelteHTMLElements } from 'svelte/elements'

type Props = HTMLProps<T> &
  PolymorphicProps<T> & {
    as: T
  }

const { asChild = false, children, render, as, ...rest }: Props = $props()

const propsFn: PropsFn<T> = (props) => mergeProps(rest, props ?? {})
</script>

{#if asChild}
  {@render render?.(propsFn)}
{:else}
  <svelte:element this={as} {...rest}>
    {@render children?.()}
  </svelte:element>
{/if}
