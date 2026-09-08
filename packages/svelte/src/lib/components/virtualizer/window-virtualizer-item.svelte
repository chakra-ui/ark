<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { VirtualItem } from '@zag-js/virtualizer'

  export interface WindowVirtualizerItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtual item to render.
     */
    item: VirtualItem
    /**
     * Whether to measure the rendered size of the item and use it instead of the estimate.
     * @default false
     */
    measure?: boolean | undefined
  }
  export interface WindowVirtualizerItemProps extends Assign<HTMLProps<'div'>, WindowVirtualizerItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

  let { ref = $bindable(null), item, measure = false, ...props }: WindowVirtualizerItemProps = $props()

  const virtualizer = useWindowVirtualizerContext()
  const mergedProps = $derived(
    mergeProps(virtualizer().getItemAriaAttrs(item.index), { style: virtualizer().getItemStyle(item) }, props),
  )

  $effect(() => {
    if (measure) item.measureElement(ref instanceof HTMLElement ? ref : null)
  })
</script>

<Ark as="div" bind:ref data-index={item.index} {...mergedProps} />
