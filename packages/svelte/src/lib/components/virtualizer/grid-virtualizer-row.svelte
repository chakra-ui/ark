<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { VirtualRow } from '@zag-js/virtualizer'

  export interface GridVirtualizerRowBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtual row to render.
     */
    row: VirtualRow
    /**
     * Whether to measure the rendered height of the row and use it instead of the estimate.
     * @default false
     */
    measure?: boolean | undefined
  }
  export interface GridVirtualizerRowProps extends Assign<HTMLProps<'div'>, GridVirtualizerRowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
  import { GridVirtualizerRowProvider } from './use-grid-virtualizer-row-context.ts'

  let { ref = $bindable(null), row, measure = false, ...props }: GridVirtualizerRowProps = $props()

  const virtualizer = useGridVirtualizerContext()
  const mergedProps = $derived(
    mergeProps(virtualizer().getRowAriaAttrs(row.row), { style: virtualizer().getRowStyle(row) }, props),
  )

  GridVirtualizerRowProvider(() => row)

  $effect(() => {
    if (measure) row.measureRow(ref instanceof HTMLElement ? ref : null)
  })
</script>

<Ark as="div" bind:ref data-index={row.row} {...mergedProps} />
