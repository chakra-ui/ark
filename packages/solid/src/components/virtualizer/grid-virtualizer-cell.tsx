import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { VirtualColumn } from '@zag-js/virtualizer'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
import { useGridVirtualizerRowContext } from './use-grid-virtualizer-row-context.ts'

interface CellProps {
  /**
   * The virtual column to render within the current row.
   */
  column: VirtualColumn
}

export interface GridVirtualizerCellBaseProps extends CellProps, PolymorphicProps<'div'> {}
export interface GridVirtualizerCellProps extends Assign<HTMLProps<'div'>, GridVirtualizerCellBaseProps> {}

const splitCellProps = createSplitProps<CellProps>()

export const GridVirtualizerCell = (props: GridVirtualizerCellProps) => {
  const [cellProps, localProps] = splitCellProps(props, ['column'])
  const virtualizer = useGridVirtualizerContext()
  const row = useGridVirtualizerRowContext()
  const mergedProps = mergeProps(
    () => ({
      ...virtualizer.getCellAriaAttrs(row().row, cellProps.column.column),
      style: normalizeProps.style(virtualizer.getCellStyleInRow(cellProps.column)),
    }),
    localProps,
  )

  return <ark.div {...mergedProps} data-index={cellProps.column.column} />
}
