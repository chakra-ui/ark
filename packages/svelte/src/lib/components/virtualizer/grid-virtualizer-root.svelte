<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseGridVirtualizerReturn } from './use-grid-virtualizer.svelte.ts'

  export interface GridVirtualizerRootBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtualizer instance returned by `useGridVirtualizer`.
     */
    value: UseGridVirtualizerReturn
  }
  export interface GridVirtualizerRootProps extends Assign<HTMLProps<'div'>, GridVirtualizerRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { GridVirtualizerProvider } from './use-grid-virtualizer-context.ts'

  let { ref = $bindable(null), value, onscroll, ...props }: GridVirtualizerRootProps = $props()

  const mergedProps = $derived(mergeProps(value.getContainerAriaAttrs(), { style: value.getContainerStyle() }, props))

  GridVirtualizerProvider(() => value)

  $effect(() => {
    value.ref(ref instanceof HTMLElement ? ref : null)
  })

  const handleScroll: HTMLProps<'div'>['onscroll'] = (event) => {
    value.getScrollHandler()(event)
    onscroll?.(event)
  }
</script>

<Ark as="div" bind:ref {...mergedProps} onscroll={handleScroll} />
