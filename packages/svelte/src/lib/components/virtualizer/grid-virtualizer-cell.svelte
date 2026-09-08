<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { VirtualColumn } from '@zag-js/virtualizer'

  export interface GridVirtualizerCellBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The virtual column to render within the current row.
     */
    column: VirtualColumn
  }
  export interface GridVirtualizerCellProps extends Assign<HTMLProps<'div'>, GridVirtualizerCellBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
  import { useGridVirtualizerRowContext } from './use-grid-virtualizer-row-context.ts'

  let { ref = $bindable(null), column, ...props }: GridVirtualizerCellProps = $props()

  const virtualizer = useGridVirtualizerContext()
  const row = useGridVirtualizerRowContext()
  const mergedProps = $derived(
    mergeProps(
      virtualizer().getCellAriaAttrs(row().row, column.column),
      { style: virtualizer().getCellStyleInRow(column) },
      props,
    ),
  )
</script>

<Ark as="div" bind:ref data-index={column.column} {...mergedProps} />
