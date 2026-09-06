'use client'

import { mergeProps } from '@zag-js/react'
import type { VirtualColumn } from '@zag-js/virtualizer'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
import { useGridVirtualizerRowContext } from './use-grid-virtualizer-row-context.ts'

interface CellProps {
  /**
   * The virtual column to render within the current row.
   */
  column: VirtualColumn
}

export interface GridVirtualizerCellBaseProps extends CellProps, PolymorphicProps {}

export interface GridVirtualizerCellProps extends HTMLProps<'div'>, GridVirtualizerCellBaseProps {}

const splitCellProps = createSplitProps<CellProps>()

export const GridVirtualizerCell = forwardRef<HTMLDivElement, GridVirtualizerCellProps>((props, ref) => {
  const [{ column }, localProps] = splitCellProps(props, ['column'])
  const virtualizer = useGridVirtualizerContext()
  const row = useGridVirtualizerRowContext()
  const mergedProps = mergeProps(
    { ...virtualizer.getCellAriaAttrs(row.row, column.column), style: virtualizer.getCellStyleInRow(column) },
    localProps,
  )

  return <ark.div {...mergedProps} data-index={column.column} ref={ref} />
})

GridVirtualizerCell.displayName = 'GridVirtualizerCell'
