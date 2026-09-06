<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseWindowVirtualizerReturn } from './use-window-virtualizer.svelte.ts'

  export interface WindowVirtualizerRootBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtualizer instance returned by `useWindowVirtualizer`.
     */
    value: UseWindowVirtualizerReturn
  }
  export interface WindowVirtualizerRootProps extends Assign<HTMLProps<'div'>, WindowVirtualizerRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { WindowVirtualizerProvider } from './use-window-virtualizer-context.ts'

  let { ref = $bindable(null), value, ...props }: WindowVirtualizerRootProps = $props()

  const mergedProps = $derived(mergeProps(value.getContainerAriaAttrs(), { style: value.getContainerStyle() }, props))

  WindowVirtualizerProvider(() => value)

  $effect(() => {
    value.ref(ref instanceof HTMLElement ? ref : null)
  })
</script>

<Ark as="div" bind:ref {...mergedProps} />
