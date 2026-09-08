<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseListVirtualizerReturn } from './use-list-virtualizer.svelte.ts'

  export interface ListVirtualizerRootBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtualizer instance returned by `useListVirtualizer`.
     */
    value: UseListVirtualizerReturn
  }
  export interface ListVirtualizerRootProps extends Assign<HTMLProps<'div'>, ListVirtualizerRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { ListVirtualizerProvider } from './use-list-virtualizer-context.ts'

  let { ref = $bindable(null), value, onscroll, ...props }: ListVirtualizerRootProps = $props()

  const mergedProps = $derived(mergeProps(value.getContainerAriaAttrs(), { style: value.getContainerStyle() }, props))

  ListVirtualizerProvider(() => value)

  $effect(() => {
    value.ref(ref instanceof HTMLElement ? ref : null)
  })

  const handleScroll: HTMLProps<'div'>['onscroll'] = (event) => {
    value.getScrollHandler()(event)
    onscroll?.(event)
  }
</script>

<Ark as="div" bind:ref {...mergedProps} onscroll={handleScroll} />
