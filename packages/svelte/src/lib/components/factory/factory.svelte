<script lang="ts" generics="T extends keyof SvelteHTMLElements">
  import type { EmptyState, HTMLProps, PolymorphicProps, PropsFn } from '$lib/types'
  import { isVoidHTMLTag, isVoidSVGTag } from '$lib/utils/tags'
  import { mergeProps } from '@zag-js/svelte'
  import { createAttachmentKey } from 'svelte/attachments'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import Svg from './svg-factory.svelte'

  type Props = HTMLProps<T> &
    PolymorphicProps<T, any> & {
      /**
       * The HTML tag of the component.
       */
      as: T
      /**
       * The bindable ref of the component.
       */
      ref?: Element | null
      /**
       * The state of the part, forwarded to the `render` snippet. Set by the component, not the consumer.
       */
      state?: unknown
    }

  let { asChild, render, children, as, state, ref = $bindable(null), ...rest }: Props = $props()

  const EMPTY_STATE: EmptyState = Object.freeze({})

  const refAttachment = {
    [createAttachmentKey()]: (node: Element) => {
      ref = node
      return () => {
        ref = null
      }
    },
  }

  const propsFn: PropsFn<T> = (props) => ({ ...mergeProps(rest, props ?? {}), ...refAttachment })
</script>

{#if render}
  {@render render(propsFn, state ?? EMPTY_STATE)}
{:else if asChild}
  {@render asChild(propsFn)}
{:else if isVoidSVGTag(as)}
  <Svg {as} {...rest} bind:ref />
{:else if isVoidHTMLTag(as)}
  <svelte:element this={as} {...rest} bind:this={ref} />
{:else if as === 'textarea'}
  <textarea {...rest} bind:this={ref}></textarea>
{:else}
  <svelte:element this={as} {...rest} bind:this={ref}>
    {@render children?.()}
  </svelte:element>
{/if}
